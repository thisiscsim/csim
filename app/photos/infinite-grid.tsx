'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PhotoImage {
  url: string;
  name: string;
  size: number;
  lastModified: string;
}

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
  const [images, setImages] = useState<PhotoImage[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollSpeed = 3;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isDraggingRef = useRef(false);
  const mouseMoveRafRef = useRef<number | null>(null);

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
    if (!draggableInstanceRef.current || !containerInnerRef.current || isDraggingRef.current)
      return;

    // Use requestAnimationFrame to throttle updates
    if (mouseMoveRafRef.current) {
      cancelAnimationFrame(mouseMoveRafRef.current);
    }

    mouseMoveRafRef.current = requestAnimationFrame(() => {
      if (!containerInnerRef.current) return;
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
    });
  };

  const initializeCanvas = async (container: HTMLElement) => {
    if (draggableInstanceRef.current) draggableInstanceRef.current.kill();
    window.removeEventListener('wheel', handleMouseWheel);
    window.removeEventListener('resize', updateBounds);
    window.removeEventListener('mousemove', handleMouseMove);

    try {
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
          isDraggingRef.current = true;
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
          const allFigures = container.querySelectorAll('figure');
          allFigures.forEach((figure) => figure.classList.remove('not-selected'));

          // Disable observer during drag for performance
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        },
        onDrag: () => {
          const bounds = calculateBounds(container);
          gsap.utils.clamp(bounds.minX, bounds.maxX, Number(gsap.getProperty(container, 'x')));
          gsap.utils.clamp(bounds.minY, bounds.maxY, Number(gsap.getProperty(container, 'y')));
        },
        onDragEnd: () => {
          setIsDragging(false);
          isDraggingRef.current = false;
          // Re-enable observer after drag
          setTimeout(() => {
            initializeObserver();
          }, 100);
        },
        onThrowUpdate: () => updateBounds(),
        onThrowComplete: () => {
          setIsDragging(false);
          isDraggingRef.current = false;
          // Re-enable observer after throw
          setTimeout(() => {
            initializeObserver();
          }, 100);
        },
      })[0] as unknown as DraggableInstance;

      window.addEventListener('wheel', handleMouseWheel);
      window.addEventListener('resize', updateBounds);
      window.addEventListener('mousemove', handleMouseMove);
    } catch (error) {
      console.error('Failed to load GSAP plugins:', error);
      // Fallback: just allow basic positioning without drag
    }

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

      // Set consistent height for all images in row
      const rowHeight = 180;
      const itemHeight = rowHeight;
      const itemWidth = Math.floor(rowHeight * ratio);

      (img as HTMLImageElement).style.width = `${itemWidth}px`;
      (img as HTMLImageElement).style.height = `${itemHeight}px`;
      (img as HTMLImageElement).style.objectFit = 'cover';
      (figure as HTMLElement).style.padding = '32px';
      (figure as HTMLElement).style.display = 'flex';
      (figure as HTMLElement).style.alignItems = 'stretch';
    });

    setTimeout(() => {
      if (containerRef.current) {
        initializeCanvas(containerRef.current);
        animateLoadIn();
        initializeObserver();
      }
    }, 100);
  };

  // Prevent browser back gesture
  useEffect(() => {
    const preventBackGesture = (e: TouchEvent) => {
      // Prevent back swipe gesture on touch devices
      if (e.touches.length > 1) return;
      e.preventDefault();
    };

    const preventHistoryNavigation = (e: WheelEvent) => {
      // Prevent horizontal scroll from triggering back/forward navigation
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    // Add event listeners to prevent back gesture
    document.addEventListener('touchstart', preventBackGesture, { passive: false });
    document.addEventListener('wheel', preventHistoryNavigation, { passive: false });

    // Prevent back/forward browser gestures
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('touchstart', preventBackGesture);
      document.removeEventListener('wheel', preventHistoryNavigation);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Fetch images from Bunny CDN
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          console.error('No images found');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined' || loading || images.length === 0)
      return;
    setTimeout(() => {
      initializeFeaturedLayout();
    }, 100);
    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', handleMouseMove);
      if (draggableInstanceRef.current) draggableInstanceRef.current.kill();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (observerRef.current) observerRef.current.disconnect();
      if (mouseMoveRafRef.current) cancelAnimationFrame(mouseMoveRafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, images]);

  const generateImages = () => {
    if (images.length === 0) return [];

    const imageNodes: React.ReactNode[] = [];
    const aspectRatios = [
      { width: 4, height: 3 },
      { width: 3, height: 4 },
      { width: 1, height: 1 },
      { width: 16, height: 9 },
      { width: 9, height: 16 },
      { width: 3, height: 2 },
    ];

    // Create multiple instances of each image for a fuller grid
    // Reduced from 50 to 30 for better performance
    const repeatCount = Math.ceil(30 / images.length);

    for (let repeat = 0; repeat < repeatCount; repeat++) {
      images.forEach((image, i) => {
        const uniqueKey = `${repeat}-${i}`;
        const ratio = aspectRatios[(repeat * images.length + i) % aspectRatios.length];
        imageNodes.push(
          <figure
            key={uniqueKey}
            className="relative p-8"
            style={{ margin: 0 }}
            onMouseEnter={(e) => handleFigureMouseEnter(e.currentTarget)}
            onMouseLeave={handleFigureMouseLeave}
          >
            <img
              src={image.url}
              alt={image.name}
              width={ratio.width * 100}
              height={ratio.height * 100}
              className="block object-cover"
              style={{ opacity: 0, transform: 'scale(0.9)' }}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </figure>
        );
      });
    }

    return imageNodes as React.ReactNode[];
  };

  const initializeObserver = () => {
    if (!containerRef.current) return;

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates if currently dragging
        if (isDraggingRef.current) return;

        entries.forEach((entry) => {
          const img = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Image is in view - use direct style manipulation for better performance
            gsap.set(img, { opacity: 1, scale: 1 });
          } else {
            // Image is out of view
            gsap.set(img, { opacity: 0.25, scale: 0.9 });
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        // Add rootMargin to reduce frequency of updates
        rootMargin: '50px',
      }
    );

    observerRef.current = observer;

    const figures = containerRef.current.querySelectorAll('figure');
    figures.forEach((figure) => {
      observer.observe(figure);
    });
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

  if (loading) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-base flex items-center justify-center transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">Loading photos...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-base flex items-center justify-center transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">No photos found</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-base transition-colors duration-300"
      style={{ overscrollBehavior: 'none', touchAction: 'none' }}
    >
      <div ref={containerInnerRef} className="container-inner">
        <div
          ref={containerRef}
          className="featured-items flex flex-wrap items-stretch cursor-grab active:cursor-grabbing"
          style={{ willChange: 'transform', minWidth: '150vw' }}
        >
          {generateImages()}
        </div>
      </div>
      <div className="fixed top-3 left-3 z-10 fg-muted pointer-events-none transition-colors duration-300">
        <p className="text-xs font-medium">Drag to explore • {images.length} photos</p>
      </div>
    </div>
  );
}
