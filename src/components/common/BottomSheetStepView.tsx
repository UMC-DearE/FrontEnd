// 바텀 시트 내부 뷰 전환

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react';

const heightSpring = { type: 'spring', stiffness: 420, damping: 42 } as const;

const slideVariants = {
  enter: (dir: number) => ({ x: `${dir * 100}%`, opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: `${-dir * 100}%`, opacity: 0 }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  step: string; // 현재 뷰 식별자 (바뀌면 전환)
  direction?: 1 | -1; // 1: 우 -> 좌 진입(다음), -1: 좌 -> 우 진입(뒤로)
  slide?: boolean; // false면 높이 트랜지션 + 페이드만
  children: ReactNode;
}

export default function BottomSheetStepView({
  step,
  direction = 1,
  slide = true,
  children,
}: Props) {
  const viewRef = useRef<HTMLDivElement>(null);
  // 높이는 state가 아닌 MotionValue로 관리 (렌더를 유발하지 않음)
  const height = useMotionValue<number | string>('auto');
  const measuredRef = useRef(false);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;

    const apply = (next: number) => {
      if (measuredRef.current) {
        animate(height, next, heightSpring);
      } else {
        // 첫 측정은 애니메이션 없이 반영 (auto -> px 점프 방지)
        measuredRef.current = true;
        height.set(next);
      }
    };

    // 마운트/스텝 변경 시 페인트 전에 동기 측정
    apply(el.offsetHeight);

    // 이미지 로드, 폴더 목록 변경 등으로 높이가 나중에 바뀌는 경우 대응
    const observer = new ResizeObserver(() => apply(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [step, height]);

  return (
    <motion.div className="relative w-full overflow-hidden" style={{ height }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slide ? slideVariants : fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          // 나가는 뷰와 들어오는 뷰가 겹치도록 둘 다 absolute, 높이는 컨테이너가 소유
          className="absolute top-0 left-0 w-full"
        >
          {/* flow-root: 자식의 margin이 밖으로 새어나가 offsetHeight가 작게 측정되는 것 방지 */}
          <div ref={viewRef} className="flow-root">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
