// src/global.d.ts
import { Object3D } from 'three';
import { Object3DNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: Object3DNode<Object3D, typeof Object3D>;
    }
  }
}
