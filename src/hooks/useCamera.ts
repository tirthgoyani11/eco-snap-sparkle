import { useState, useRef, useCallback, useEffect } from 'react';

export interface CameraState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
  stream: MediaStream | null;
}

export const useCamera = () => {
  const [state, setState] = useState<CameraState>({
    isActive: false,
    isLoading: false,
    error: null,
    hasPermission: false,
    stream: null,
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const checkPermissions = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setState(prev => ({ ...prev, hasPermission: result.state === 'granted' }));
      return result.state === 'granted';
    } catch (error) {
      // Fallback for browsers that don't support permissions API
      return true;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState(prev => ({
        ...prev,
        isActive: true,
        isLoading: false,
        hasPermission: true,
        stream,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to access camera';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        hasPermission: false,
      }));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      stream: null,
    }));
  }, []);

  const takePhoto = useCallback((): string | null => {
    if (!videoRef.current || !state.isActive) return null;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }, [state.isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    ...state,
    videoRef,
    startCamera,
    stopCamera,
    takePhoto,
    checkPermissions,
  };
};