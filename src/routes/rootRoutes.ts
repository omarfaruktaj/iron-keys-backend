import { Router } from 'express';

const router = Router();

// Root route
router.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to IronKeys server!',
    });
});

// Health route
router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running smoothly!',
    });
});

export default router;
