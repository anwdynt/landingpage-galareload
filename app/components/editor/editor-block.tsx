import React, { useEffect, useRef, memo } from 'react';
// Remove static imports to avoid SSR issues
import { useDispatch, useSelector } from 'react-redux';
import { setContent, setIsDirty } from '~/store/slices/editorSlice';
import type { RootState } from '~/store';

interface EditorBlockProps {
    initialData?: any;
}

const EditorBlock = memo(({ initialData }: EditorBlockProps) => {
    const dispatch = useDispatch();
    const ejInstance = useRef<any>(null); // Use any for instance to simplify dynamic types
    const content = useSelector((state: RootState) => state.editor.content);
    // Use a ref to track if instance is ready to avoid double init
    const isReady = useRef(false);

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
    }, []);

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

            const editor = new EditorJS({
                holder: 'editorjs',
                logLevel: 'ERROR' as any,
                data: JSON.parse(JSON.stringify(initialData || content || {})),
                onReady: () => {
                    ejInstance.current = editor;
                },
                onChange: async () => {
                    const data = await editor.save();
                    dispatch(setContent(data));
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
                            endpoints: {
                                byFile: '/api/upload', // Backend endpoint for file upload
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
