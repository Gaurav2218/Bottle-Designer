import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BottleCanvas = ({ texture }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xeeeeee); // Set background color to light grey (or any color you prefer)
        camera.position.z = 8;

        // Add bottle geometry
        const geometry = new THREE.CylinderGeometry(1, 1, 3, 15);
        const material = new THREE.MeshStandardMaterial();
        const bottle = new THREE.Mesh(geometry, material);
        scene.add(bottle);

        // Add ambient light (even light from all directions)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Bright white light
        scene.add(ambientLight);

        // Add point light (focused light, adjust its intensity and position)
        const pointLight = new THREE.PointLight(0xffffff, 1.5, 10); // Increased intensity
        pointLight.position.set(5, 5, 5); // Position to illuminate from above and at an angle
        scene.add(pointLight);

        // Apply texture when available
        if (texture) {
            const loader = new THREE.TextureLoader();
            loader.load(texture, (loadedTexture) => {
                bottle.material.map = loadedTexture;
                bottle.material.needsUpdate = true;
            });
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            bottle.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => renderer.dispose();
    }, [texture]);

    return <canvas ref={canvasRef} />;
};

export default BottleCanvas;
