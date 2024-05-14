import { useMemo } from 'react';
import { SvgIconProps } from '@/types/svgIcon';

export default function SvgIcon({ color, name, size = 16, prefix = 'icon' }: SvgIconProps) {
    const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
    return (
        <svg aria-hidden="true" width={size} height={size} fill={color}>
            <use href={symbolId} fill={color} />
        </svg>
    );
}