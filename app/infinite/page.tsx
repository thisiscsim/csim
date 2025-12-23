'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Note: Draggable/InertiaPlugin and Packery are dynamically imported on client to avoid SSR window usage

export default function InfinitePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInnerRef = useRef<HTMLDivElement>(null);
  // Minimal type for the Draggable instance we use
  interface DraggableInstance {
    target: HTMLElement | SVGElement;
    update: () => void;
    applyBounds: (bounds: { minX: number; minY: number; maxX: number; maxY: number }) => void;
    kill: () => void;
  }
  const draggableInstanceRef = useRef<DraggableInstance | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollSpeed = 3; // Global scroll sensitivity

  // Calculate bounds for dragging
  const calculateBounds = (container: HTMLElement | SVGElement) => {
    const scale = 1; // Default scale
    const el = container as HTMLElement;
    const maxX = -el.offsetWidth * scale + window.innerWidth;
    const maxY = -el.offsetHeight * scale + window.innerHeight;
    return { minX: maxX, minY: maxY, maxX: 0, maxY: 0 };
  };

  // Handle mouse wheel scrolling
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

  // Update bounds when needed
  const updateBounds = () => {
    if (draggableInstanceRef.current) {
      const container = draggableInstanceRef.current.target as HTMLElement;
      draggableInstanceRef.current.applyBounds(calculateBounds(container));
    }
  };

  // Handle mouse move for subtle nudging effect
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

  // Initialize the canvas with draggable
  const initializeCanvas = async (container: HTMLElement) => {
    // Remove previous Draggable instance
    if (draggableInstanceRef.current) {
      draggableInstanceRef.current.kill();
    }

    // Remove existing event listeners
    window.removeEventListener('wheel', handleMouseWheel);
    window.removeEventListener('resize', updateBounds);
    window.removeEventListener('mousemove', handleMouseMove);

    // Dynamically import Draggable/Inertia on client
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
        // Clear hover state when dragging starts
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        // Remove 'not-selected' from all figures
        const allFigures = container.querySelectorAll('figure');
        allFigures.forEach((figure) => {
          figure.classList.remove('not-selected');
        });
      },
      onDrag: () => {
        const bounds = calculateBounds(container);
        gsap.utils.clamp(bounds.minX, bounds.maxX, Number(gsap.getProperty(container, 'x')));
        gsap.utils.clamp(bounds.minY, bounds.maxY, Number(gsap.getProperty(container, 'y')));
      },
      onDragEnd: () => {
        setIsDragging(false);
      },
      onThrowUpdate: () => {
        updateBounds();
      },
      onThrowComplete: () => {
        setIsDragging(false);
      },
    })[0];

    // Add event listeners
    window.addEventListener('wheel', handleMouseWheel);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('mousemove', handleMouseMove);

    // Center the container
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const initialX = (viewportWidth - containerWidth) / 2;
    const initialY = (viewportHeight - containerHeight) / 2;

    gsap.set(container, {
      x: initialX,
      y: initialY,
    });
  };

  // Handle hover events like Paul's implementation
  const handleFigureMouseEnter = (figure: HTMLElement) => {
    if (isDragging) return;

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set timeout for 500ms delay like Paul's implementation
    hoverTimeoutRef.current = setTimeout(() => {
      // Add 'not-selected' to other figures
      const allFigures = containerRef.current?.querySelectorAll('figure');
      allFigures?.forEach((otherFigure) => {
        if (otherFigure !== figure) {
          otherFigure.classList.add('not-selected');
        }
      });
    }, 500); // 500ms delay
  };

  const handleFigureMouseLeave = () => {
    // Clear the timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Remove 'not-selected' from all figures
    const allFigures = containerRef.current?.querySelectorAll('figure');
    allFigures?.forEach((figure) => {
      figure.classList.remove('not-selected');
    });
  };

  // Initialize the featured layout like Paul's site
  const initializeFeaturedLayout = async () => {
    if (!containerRef.current) return;

    // let totalWidth = 0;
    // let totalHeight = 0;

    const items = containerRef.current.querySelectorAll('img');
    // const totalItems = items.length;

    // const margins = 40; // Example margin size (left and right)

    items.forEach((img) => {
      const figure = img.closest('figure');
      if (!figure) return;

      const imgWidth = parseInt(img.getAttribute('width') || '300', 10);
      const imgHeight = parseInt(img.getAttribute('height') || '200', 10);

      const ratio = imgWidth / imgHeight; // Aspect ratio (width divided by height)

      // Random size for the long edge between 240 and 480
      const min = 240;
      const max = 480;
      const randomSizeLongEdge = Math.floor(Math.random() * (max - min + 1) + min);

      let itemWidth, itemHeight;

      // Determine if width or height is the longest edge
      if (imgWidth >= imgHeight) {
        // Width is the longest edge
        itemWidth = randomSizeLongEdge;
        itemHeight = Math.floor(randomSizeLongEdge / ratio);
      } else {
        // Height is the longest edge
        itemHeight = randomSizeLongEdge;
        itemWidth = Math.floor(randomSizeLongEdge * ratio);
      }

      // Add the item's width and height, including margins
      // totalWidth += itemWidth + margins;
      // totalHeight += itemHeight + margins;

      img.style.width = `${itemWidth}px`;
      img.style.height = `${itemHeight}px`;

      const minPadding = 40;
      const maxPadding = 80;

      figure.style.padding = `${Math.floor(Math.random() * (maxPadding - minPadding + 1) + minPadding)}px`;
    });

    // Calculate grid dimensions based on 4:3 ratio
    // const approximateRows = Math.ceil(Math.sqrt(totalItems * (3 / 4))); // More rows due to 4:3
    // const approximateCols = Math.ceil(totalItems / approximateRows);

    // Calculate the container width based on the grid (unused but kept for reference)
    // const containerWidth = approximateCols * (totalWidth / totalItems);
    // const containerHeight = approximateRows * (totalHeight / totalItems);

    // Initialize Packery layout via dynamic import (client-only)
    // loose type to avoid missing d.ts issues
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

    // Set the container width after Packery layout
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.width = containerRef.current.offsetWidth + 'px';
        initializeCanvas(containerRef.current);
        // After layout is ready, run load-in animation similar to Paul's staggered fade/scale
        animateLoadIn();
      }
    }, 100);
  };

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // Initialize the layout after a short delay to ensure images are loaded
    setTimeout(() => {
      initializeFeaturedLayout();
    }, 100);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', handleMouseMove);
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
      }
      // Clear hover timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate images with different aspect ratios
  const generateImages = () => {
    const images = [];
    const craftImages = Array.from({ length: 9 }, (_, i) => `/craft/${i + 1}.jpg`);

    // Define different aspect ratios to simulate Paul's varied layout
    const aspectRatios = [
      { width: 4, height: 3 }, // Landscape
      { width: 3, height: 4 }, // Portrait
      { width: 1, height: 1 }, // Square
      { width: 16, height: 9 }, // Wide
      { width: 9, height: 16 }, // Tall
      { width: 3, height: 2 }, // Classic
    ];

    // Generate more images for a fuller canvas
    const numImages = 30;

    for (let i = 0; i < numImages; i++) {
      const imageUrl = craftImages[i % craftImages.length];
      const ratio = aspectRatios[i % aspectRatios.length];

      images.push(
        <figure
          key={i}
          className="absolute"
          style={{
            margin: 0,
          }}
          onMouseEnter={(e) => handleFigureMouseEnter(e.currentTarget)}
          onMouseLeave={handleFigureMouseLeave}
        >
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
    return images;
  };

  // Replicate Paul's staggered load-in: fade/scale in images with a random stagger
  const animateLoadIn = () => {
    if (!containerRef.current) return;
    const images = Array.from(containerRef.current.querySelectorAll('img')) as HTMLImageElement[];
    if (images.length === 0) return;

    // Ensure initial state before animating (prevents flash on mount)
    gsap.set(images, { opacity: 0, scale: 0.9 });

    // Animate in with randomized stagger
    gsap.to(images, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.04, from: 'random' },
    });
  };

  return (
    <div className="fixed inset-0 bg-base overflow-hidden transition-colors duration-300">
      {/* Container inner for nudging effect */}
      <div ref={containerInnerRef} className="container-inner">
        {/* Draggable Canvas */}
        <div
          ref={containerRef}
          className="featured-items absolute cursor-grab active:cursor-grabbing group"
          style={{
            willChange: 'transform',
          }}
        >
          {generateImages()}
        </div>
      </div>

      {/* Simple instructions */}
      <div className="fixed top-8 left-8 z-50 fg-muted pointer-events-none transition-colors duration-300">
        <p className="text-sm font-medium">Drag to explore</p>
      </div>
    </div>
  );
}
