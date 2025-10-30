"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SolarFarm } from "./patterns/SolarFarm";
import { SolarPanelGrid } from "./patterns/SolarPanelGrid";
import { SunRays } from "./patterns/SunRays";
import { EnergyFlow } from "./patterns/EnergyFlow";

export default function ParamountLoader() {
  return (
    <section id="loader" className="z-50">
      <SolarFarm/>
      <SolarPanelGrid/>
      <SunRays/>
      <EnergyFlow/>
      <div className="flex items-center justify-center w-screen h-screen">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 0.8, 0.6, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.4, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/p1.png"
          alt="Paramount Logo"
          width={30}
          height={30}
          className="drop-shadow-xl"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1.4, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4, 0.6, 0.8, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/p2.png"
          alt="Paramount Logo"
          width={30}
          height={30}
          className="drop-shadow-xl"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 0.8, 0.6, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.4, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/p3.png"
          alt="Paramount Logo"
          width={30}
          height={30}
          className="drop-shadow-xl"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1.4, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4, 0.6, 0.8, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/p4.png"
          alt="Paramount Logo"
          width={30}
          height={30}
        />
      </motion.div>
    </div>
    </section>
  );
}
