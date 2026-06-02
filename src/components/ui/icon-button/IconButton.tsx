import { motion } from 'motion/react';
import { ActionIcon, MantineGradient } from '@mantine/core';

interface IconButtonProps {
  icon: string;
  size?: string;
  label?: string;
  gradient?: MantineGradient;
  onClick?: () => void;
}

export function IconButton({
  icon,
  size = 'lg',
  label = '',
  gradient,
  onClick,
}: IconButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
      <ActionIcon
        variant="gradient"
        gradient={gradient}
        aria-label={label}
        size={size}
        onClick={onClick}>
        <span className="material-icons">{icon}</span>
      </ActionIcon>
    </motion.div>
  );
}
