"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        // @ts-ignore
        children,
        document.getElementById("modal-root") || document.body
      )
    : null;
};
