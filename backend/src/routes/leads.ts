import { Router } from 'express'
import { query } from '../database/db'
import { body, validationResult } from 'express-validator'

const router = Router()

// POST /api/leads - Create new lead
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required')
      .matches(/^(0|\+84)[0-9]{9,10}$/).withMessage('Invalid phone number'),
    body('email').isEmail().withMessage('Invalid email'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('source').isIn(['homepage', 'project', 'contact']).withMessage('Invalid source'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
      const { name, phone, email, message, source } = req.body

      const result = await query(
        'INSERT INTO leads (name, phone, email, message, source) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, phone, email, message, source]
      )

      res.status(201).json({
        success: true,
        data: result.rows[0],
        message: 'Lead created successfully',
      })
    } catch (error) {
      console.error('Error creating lead:', error)
      res.status(500).json({ success: false, message: 'Failed to create lead' })
    }
  }
)

// GET /api/leads - Get all leads (admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, source } = req.query
    
    let queryText = 'SELECT * FROM leads WHERE 1=1'
    const queryParams: any[] = []
    let paramCount = 0

    if (source) {
      paramCount++
      queryText += ` AND source = $${paramCount}`
      queryParams.push(source)
    }

    const countResult = await query(`SELECT COUNT(*) FROM (${queryText}) as count_query`, queryParams)
    const total = parseInt(countResult.rows[0].count)

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    queryText += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
    queryParams.push(limit, offset)

    const result = await query(queryText, queryParams)

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch leads' })
  }
})

export default router
