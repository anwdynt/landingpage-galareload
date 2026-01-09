import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store';
import { Button } from '~/components/ui/button';
import { Loader2 } from 'lucide-react';

interface EditorLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    onSave: (status: string) => void;
    titleInput: ReactNode;
}

export default function EditorLayout({ children, sidebar, onSave, titleInput }: EditorLayoutProps) {
    const isSaving = useSelector((state: RootState) => state.ui.isSaving);
    const isDirty = useSelector((state: RootState) => state.editor.isDirty);
    const lastSaved = useSelector((state: RootState) => state.ui.lastAutosave);

    return (
        <div className="max-w-[1600px] mx-auto p-6 h-screen flex flex-col">
            {/* Top Bar */}
            <div className="flex px-4 rounded-lg justify-between items-center mb-6 sticky top-0 z-50 bg-gray-100 dark:bg-neutral-900 py-4">
                <div className="flex items-center gap-4">
                    {/* Back button could go here */}
                    <span className="text-sm text-neutral-500">
                        {isSaving ? 'Saving...' : (lastSaved ? `Saved ${lastSaved}` : (isDirty ? 'Unsaved changes' : 'All changes saved'))}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onSave('DRAFT')}>Save Draft</Button>
                    <Button onClick={() => onSave('PUBLISHED')} disabled={isSaving}>
                        {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Publish
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Editor Area */}
                <div className="lg:col-span-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm flex flex-col overflow-y-auto">
                    <div className="mb-8">
                        {titleInput}
                    </div>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 overflow-y-auto">
                    {sidebar}
                </div>
            </div>
        </div>
    );
}
