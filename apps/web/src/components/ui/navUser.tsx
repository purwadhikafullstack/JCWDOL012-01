'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
    href: string;
  }[];
}

export function NavUser({ links }: NavProps) {
  const pathName = usePathname();
  return (
    <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              buttonVariants({
                variant: link.href === pathName ? 'default' : 'ghost',
                size: 'sm',
              }),
              link.variant === 'default' && 'justify-start',
              link.href === pathName ? 'bg-blue-500 text-white' : '',
            )}
            style={
              link.href === pathName ? { pointerEvents: 'none' } : undefined
            }
          >
            <link.icon className="mr-2 h-4 w-4" />
            <div className="text-lg">{link.title}</div>
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default' &&
                    'text-background dark:text-white',
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
