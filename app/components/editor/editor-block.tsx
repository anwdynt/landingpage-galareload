import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// Remove static imports to avoid SSR issues
import type { OutputData } from '@editorjs/editorjs';
import { useDispatch, useSelector } from 'react-redux';
import { setContent, setIsDirty } from '~/store/slices/editorSlice';
import type { RootState } from '~/store';

interface EditorBlockProps {
    initialData?: OutputData;
}

export interface EditorBlockHandle {
    save: () => Promise<OutputData>;
}

const EditorBlock = forwardRef<EditorBlockHandle, EditorBlockProps>(({ initialData }, ref) => {
    const dispatch = useDispatch();
    const ejInstance = useRef<{ save: () => Promise<OutputData>; destroy: () => void } | null>(null);
    const content = useSelector((state: RootState) => state.editor.content);
    // Use a ref to track if instance is ready to avoid double init
    const isReady = useRef(false);

    useImperativeHandle(ref, () => ({
        save: async () => {
            if (ejInstance.current && ejInstance.current.save) {
                const data = await ejInstance.current.save();
                // Deep clone to prevent Redux from freezing EditorJS internal objects
                dispatch(setContent(JSON.parse(JSON.stringify(data))));
                dispatch(setIsDirty(true));
                return data;
            }
            return (content as unknown as OutputData) || { time: Date.now(), blocks: [], version: '2.30.0' };
        }
    }));

    useEffect(() => {
        if (!isReady.current) {
            initEditor();
        }

        return () => {
            if (ejInstance.current && ejInstance.current.destroy) {
                ejInstance.current.destroy();
                ejInstance.current = null;
                isReady.current = false;
            }
        }
    }, [initialData]); // Added initialData as dependency if needed, though mostly static

    const initEditor = async () => {
        if (isReady.current) return;
        isReady.current = true; // Mark as initializing

        try {
            // Dynamically import EditorJS and Tools
            const EditorJS = (await import('@editorjs/editorjs')).default;
            const Header = (await import('@editorjs/header')).default;
            const List = (await import('@editorjs/list')).default;
            const Quote = (await import('@editorjs/quote')).default;
            const Code = (await import('@editorjs/code')).default;
            const InlineCode = (await import('@editorjs/inline-code')).default;
            const ImageTool = (await import('@editorjs/image')).default;


            // Prioritize initialData (from DB/Parent) to ensure correct post loads.
            // Fallback to Redux content only if initialData is empty (restricted to new posts)
            const hasInitialData = initialData && Object.keys(initialData).length > 0;
            const startData = hasInitialData ? initialData : (content || {});

            const editor = new EditorJS({
                holder: 'editorjs',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                logLevel: 'ERROR' as any,
                data: JSON.parse(JSON.stringify(startData)),
                onReady: () => {
                    ejInstance.current = editor;
                },
                onChange: async () => {
                    // Optional: You can keep autosave or rely on manual save
                    const data = await editor.save();
                    // Deep clone to prevent Redux from freezing EditorJS internal objects
                    dispatch(setContent(JSON.parse(JSON.stringify(data))));
                    dispatch(setIsDirty(true));
                },
                autofocus: true,
                tools: {
                    header: Header,
                    list: List,
                    quote: Quote,
                    code: Code,
                    inlineCode: InlineCode,
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    try {
                                        // Dynamically import processor to avoid SSR issues
                                        const { processImage } = await import('~/utils/image-processor');

                                        // Compress and convert to WebP
                                        const processedFile = await processImage(file);

                                        const formData = new FormData();
                                        formData.append('image', processedFile);

                                        const response = await fetch('/api/upload', {
                                            method: 'POST',
                                            body: formData,
                                        });

                                        if (!response.ok) {
                                            throw new Error('Upload failed');
                                        }

                                        const data = await response.json();
                                        return data;
                                    } catch (error) {
                                        console.error('Image upload failed:', error);
                                        return {
                                            success: 0,
                                            file: { url: '' }
                                        };
                                    }
                                }
                            }
                        }
                    }
                },
            });
        } catch (error) {
            console.error("Editor init failed", error);
            isReady.current = false; // Reset on failure
        }
    };

    return (
        <div className="prose max-w-none dark:prose-invert">
            <div id="editorjs" className="min-h-[500px]" />
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';
export default EditorBlock;
