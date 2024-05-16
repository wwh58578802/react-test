import React, { useMemo } from 'react';
import { SvgIconProps } from '@/types/svgIcon';

export const SvgIcon: React.FC<SvgIconProps> = ({ color, name, size = 16, prefix = 'icon' }) => {
    const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
    return (
        <svg aria-hidden="true" width={size} height={size} fill={color}>
            <use href={symbolId} fill={color} />
        </svg>
    );
}