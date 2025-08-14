'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInnerRef = useRef<HTMLDivElement>(null);
  interface DraggableInstance {
    target: HTMLElement | SVGElement;
    update: () => void;
    applyBounds: (bounds: { minX: number; minY: number; maxX: number; maxY: number }) => void;
    kill: () => void;
  }
  const draggableInstanceRef = useRef<DraggableInstance | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollSpeed = 3;

  const calculateBounds = (container: HTMLElement | SVGElement) => {
    const el = container as HTMLElement;
    const maxX = -el.offsetWidth + window.innerWidth;
    const maxY = -el.offsetHeight + window.innerHeight;
    return { minX: maxX, minY: maxY, maxX: 0, maxY: 0 };
  };

  const handleMouseWheel = (event: WheelEvent) => {
    if (!draggableInstanceRef.current) return;
    const container = draggableInstanceRef.current.target as HTMLElement;
    const currentX = gsap.getProperty(container, 'x');
    const currentY = gsap.getProperty(container, 'y');
    let newX = Number(currentX) - event.deltaX * scrollSpeed;
    let newY = Number(currentY) - event.deltaY * scrollSpeed;
    const bounds = calculateBounds(container);
    newX = gsap.utils.clamp(bounds.minX, bounds.maxX, newX);
    newY = gsap.utils.clamp(bounds.minY, bounds.maxY, newY);
    gsap.to(container, {
      x: newX,
      y: newY,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => draggableInstanceRef.current?.update(),
      onComplete: () => draggableInstanceRef.current?.update(),
    });
    updateBounds();
  };

  const updateBounds = () => {
    if (!draggableInstanceRef.current) return;
    const container = draggableInstanceRef.current.target as HTMLElement;
    draggableInstanceRef.current.applyBounds(calculateBounds(container));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggableInstanceRef.current || !containerInnerRef.current) return;
    const maxNudge = 50;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const nudgeAmountX = (mouseX / window.innerWidth - 0.5) * maxNudge;
    const nudgeAmountY = (mouseY / window.innerHeight - 0.5) * maxNudge;
    gsap.to(containerInnerRef.current, {
      x: nudgeAmountX,
      y: nudgeAmountY,
      duration: 1.5,
      ease: 'power3.out',
    });
  };

  const initializeCanvas = async (container: HTMLElement) => {
    if (draggableInstanceRef.current) draggableInstanceRef.current.kill();
    window.removeEventListener('wheel', handleMouseWheel);
    window.removeEventListener('resize', updateBounds);
    window.removeEventListener('mousemove', handleMouseMove);

    const [{ Draggable }, { InertiaPlugin }] = await Promise.all([
      import('gsap/Draggable'),
      import('gsap/InertiaPlugin'),
    ]);
    gsap.registerPlugin(Draggable, InertiaPlugin);

    draggableInstanceRef.current = Draggable.create(container, {
      type: 'x,y',
      edgeResistance: 0.85,
      inertia: true,
      bounds: calculateBounds(container),
      throwProps: true,
      throwResistance: 20000,
      maxDuration: 3,
      minDuration: 0.5,
      onDragStart: () => {
        setIsDragging(true);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        const allFigures = container.querySelectorAll('figure');
        allFigures.forEach((figure) => figure.classList.remove('not-selected'));
      },
      onDrag: () => {
        const bounds = calculateBounds(container);
        gsap.utils.clamp(bounds.minX, bounds.maxX, Number(gsap.getProperty(container, 'x')));
        gsap.utils.clamp(bounds.minY, bounds.maxY, Number(gsap.getProperty(container, 'y')));
      },
      onDragEnd: () => setIsDragging(false),
      onThrowUpdate: () => updateBounds(),
      onThrowComplete: () => setIsDragging(false),
    })[0] as unknown as DraggableInstance;

    window.addEventListener('wheel', handleMouseWheel);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('mousemove', handleMouseMove);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const initialX = (viewportWidth - containerWidth) / 2;
    const initialY = (viewportHeight - containerHeight) / 2;
    gsap.set(container, { x: initialX, y: initialY });
  };

  const handleFigureMouseEnter = (figure: HTMLElement) => {
    if (isDragging) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      const allFigures = containerRef.current?.querySelectorAll('figure');
      allFigures?.forEach((otherFigure) => {
        if (otherFigure !== figure) otherFigure.classList.add('not-selected');
      });
    }, 500);
  };

  const handleFigureMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    const allFigures = containerRef.current?.querySelectorAll('figure');
    allFigures?.forEach((figure) => figure.classList.remove('not-selected'));
  };

  const initializeFeaturedLayout = async () => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('img');
    items.forEach((img) => {
      const figure = img.closest('figure');
      if (!figure) return;
      const imgWidth = parseInt(img.getAttribute('width') || '300', 10);
      const imgHeight = parseInt(img.getAttribute('height') || '200', 10);
      const ratio = imgWidth / imgHeight;
      const min = 240;
      const max = 480;
      const randomSizeLongEdge = Math.floor(Math.random() * (max - min + 1) + min);
      let itemWidth: number, itemHeight: number;
      if (imgWidth >= imgHeight) {
        itemWidth = randomSizeLongEdge;
        itemHeight = Math.floor(randomSizeLongEdge / ratio);
      } else {
        itemHeight = randomSizeLongEdge;
        itemWidth = Math.floor(randomSizeLongEdge * ratio);
      }
      (img as HTMLImageElement).style.width = `${itemWidth}px`;
      (img as HTMLImageElement).style.height = `${itemHeight}px`;
      const minPadding = 40;
      const maxPadding = 80;
      (figure as HTMLElement).style.padding = `${Math.floor(
        Math.random() * (maxPadding - minPadding + 1) + minPadding
      )}px`;
    });

    type PackeryCtorLoose = new (
      root: Element | string,
      options?: { itemSelector?: string; resize?: boolean }
    ) => unknown;
    const imported: unknown = await import('packery');
    const PackeryCtor = (
      typeof imported === 'function'
        ? (imported as unknown as PackeryCtorLoose)
        : (imported as { default: PackeryCtorLoose }).default
    ) as PackeryCtorLoose;
    new PackeryCtor(containerRef.current, {
      itemSelector: 'figure',
      resize: false,
    });

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.width = containerRef.current.offsetWidth + 'px';
        initializeCanvas(containerRef.current);
        animateLoadIn();
      }
    }, 100);
  };

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    setTimeout(() => {
      initializeFeaturedLayout();
    }, 100);
    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', handleMouseMove);
      if (draggableInstanceRef.current) draggableInstanceRef.current.kill();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateImages = () => {
    const images: React.ReactNode[] = [];
    const craftImages = Array.from({ length: 9 }, (_, i) => `/craft/${i + 1}.jpg`);
    const aspectRatios = [
      { width: 4, height: 3 },
      { width: 3, height: 4 },
      { width: 1, height: 1 },
      { width: 16, height: 9 },
      { width: 9, height: 16 },
      { width: 3, height: 2 },
    ];
    const numImages = 30;
    for (let i = 0; i < numImages; i++) {
      const imageUrl = craftImages[i % craftImages.length];
      const ratio = aspectRatios[i % aspectRatios.length];
      images.push(
        <figure
          key={i}
          className="absolute"
          style={{ margin: 0 }}
          onMouseEnter={(e) => handleFigureMouseEnter(e.currentTarget)}
          onMouseLeave={handleFigureMouseLeave}
        >
          {/* Using img here for simplicity to match behavior */}
          <img
            src={imageUrl}
            alt={`Image ${i + 1}`}
            width={ratio.width * 100}
            height={ratio.height * 100}
            className="block object-cover"
            style={{ opacity: 0, transform: 'scale(0.9)' }}
            draggable={false}
          />
        </figure>
      );
    }
    return images as React.ReactNode[];
  };

  const animateLoadIn = () => {
    if (!containerRef.current) return;
    const images = Array.from(containerRef.current.querySelectorAll('img')) as HTMLImageElement[];
    if (images.length === 0) return;
    gsap.set(images, { opacity: 0, scale: 0.9 });
    gsap.to(images, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.04, from: 'random' },
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-primary">
      <div ref={containerInnerRef} className="container-inner">
        <div
          ref={containerRef}
          className="featured-items absolute cursor-grab active:cursor-grabbing"
          style={{ willChange: 'transform' }}
        >
          {generateImages()}
        </div>
      </div>
      <div className="fixed top-3 left-3 z-10 text-black/60 pointer-events-none">
        <p className="text-xs font-medium">Drag to explore</p>
      </div>
    </div>
  );
}
