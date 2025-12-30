'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 10
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className="perspective-1000"
        >
            <div className="h-full w-full glass rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-indigo-500/20">
                {children}
            </div>
        </motion.div>
    );
}
