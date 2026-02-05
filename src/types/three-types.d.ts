import { Object3DNode } from '@react-three/fiber'
import { SphereGeometry } from 'three'

declare module '@react-three/fiber' {
    interface ThreeElements {
        sphereGeometry: Object3DNode<SphereGeometry, typeof SphereGeometry>
    }
}
