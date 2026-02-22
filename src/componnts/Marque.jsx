import { Icon } from '@iconify/react';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const Marque = ({
    items,
    className = 'text-orange-500 bg-black',
    iconName = "mdi:gamepad-variant",
    iconClassname = "",
    reverse = false,
}) => {

    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            xPercents = [],
            curIndex = 0,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
            totalWidth, curX, distanceToStart, distanceToLoop, item, i;
        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
            xPercent: (i, el) => {
                let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                return xPercents[i];
            }
        });
        gsap.set(items, { x: 0 });
        totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
        for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX;
            distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
            tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
        }
        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            curIndex = newIndex;
            vars.overwrite = true;
            return tl.tweenTo(time, vars);
        }
        tl.next = vars => toIndex(curIndex + 1, vars);
        tl.previous = vars => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        return tl;
    }

    useEffect(() => {
        const tl = horizontalLoop(itemsRef.current, {
            repeat: -1,
            paddingRight: 30,
        });

        const baseDirection = reverse ? -1 : 1;

        if (reverse) {
            tl.progress(1);
        }

        tl.timeScale(baseDirection);

        const observer = Observer.create({
            onChangeY(self) {
                let direction = baseDirection;

                if (self.deltaY < 0) {
                    direction *= -1;
                }

                gsap.timeline({ defaults: { ease: "none" } })
                    .to(tl, { timeScale: direction * 3, duration: 0.2, overwrite: true })
                    .to(tl, { timeScale: baseDirection, duration: 1 }, "+=0.3");
            }
        });

        return () => {
            tl.kill();
            observer.kill();
        };
    }, [items, reverse]);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden w-full h-20 md:h-25 flex items-center marque-text-responsive uppercase whitespace-nowrap ${className}`}
        >
            <div className='flex'>
                {items.map((item, index) => (
                    <span key={index} ref={(el) => (itemsRef.current[index] = el)} className='flex items-center px-16 gap-x-32'>
                        {item}
                        <Icon icon={iconName} className={iconClassname} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marque;