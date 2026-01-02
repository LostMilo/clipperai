import { WhopDeal } from "../types";

const MOCK_DEALS: WhopDeal[] = [
    {
        id: 'deal-1',
        name: 'Alpha Trading Signals',
        category: 'Trading',
        commission: '40%',
        monthlyVolume: '$1.2M',
        imageUrl: 'https://cdn.dribbble.com/users/1894420/screenshots/14041697/media/5e100806443c20c02dc86827055df27d.png?resize=400x300&vertical=center',
        relatedVideoUrl: 'https://www.youtube.com/watch?v=mock_trading_video'
    },
    {
        id: 'deal-2',
        name: 'Ecom University',
        category: 'E-commerce',
        commission: '30%',
        monthlyVolume: '$850K',
        imageUrl: 'https://cdn.dribbble.com/users/6234/screenshots/15691238/media/1a3f626154562c1221ac07fb081a953e.png?resize=400x300&vertical=center',
        relatedVideoUrl: 'https://www.youtube.com/watch?v=mock_ecom_video'
    },
    {
        id: 'deal-3',
        name: 'FitLife Coaching',
        category: 'Health & Fitness',
        commission: '50%',
        monthlyVolume: '$400K',
        imageUrl: 'https://cdn.dribbble.com/users/1615584/screenshots/14660377/media/9573887950280436034177247a840e69.jpg?resize=400x300&vertical=center',
        relatedVideoUrl: 'https://www.youtube.com/watch?v=mock_fitness_video'
    }
];

export const scourWhopForDeals = async (): Promise<WhopDeal> => {
    // Simulate network latency and searching
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a random deal
    const randomIndex = Math.floor(Math.random() * MOCK_DEALS.length);
    return MOCK_DEALS[randomIndex];
};