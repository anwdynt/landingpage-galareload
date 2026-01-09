import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setMeta, setFeaturedImage, toggleCategory, setPostSettings } from '~/store/slices/postSettingsSlice';
import { setSlug } from '~/store/slices/editorSlice';
import type { RootState } from '~/store';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

interface PostSettingsSidebarProps {
    categories: { id: number; name: string }[];
}

export default function PostSettingsSidebar({ categories }: PostSettingsSidebarProps) {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.postSettings);
    const slug = useSelector((state: RootState) => state.editor.slug);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-neutral-500">Publish</h3>
                <div className="space-y-2">
                    <Label>Status</Label>
                    <select
                        value={settings.status}
                        onChange={(e) => dispatch(setStatus(e.target.value as any))}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="PENDING">Pending Review</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-md border items-center px-3 text-sm text-neutral-500">
                        <span>/blog/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => dispatch(setSlug(e.target.value))}
                            className="bg-transparent border-none focus:ring-0 flex-1 p-2 text-neutral-900 dark:text-neutral-100"
                            placeholder="url-slug"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="font-semibold text-neutral-900 dark:text-white border-b pb-2">Post Details</h3>
                <div className="space-y-2">
                    <Label>Featured Image (URL)</Label>
                    <Input
                        value={settings.featuredImage || ''}
                        onChange={(e) => dispatch(setFeaturedImage(e.target.value))}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Textarea
                        value={settings.excerpt || ''}
                        onChange={(e) => dispatch(setPostSettings({ excerpt: e.target.value }))}
                        placeholder="Short summary..."
                        className="h-20"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="font-semibold text-neutral-900 dark:text-white border-b pb-2">SEO Settings</h3>
                <div className="space-y-2">
                    <Label>Meta Title</Label>
                    <Input
                        value={settings.meta.title}
                        onChange={(e) => dispatch(setMeta({ title: e.target.value }))}
                        placeholder="Custom page title"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea
                        value={settings.meta.description}
                        onChange={(e) => dispatch(setMeta({ description: e.target.value }))}
                        className="h-20"
                        placeholder="Meta description..."
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-neutral-500">Categories</h3>
                <div className="max-h-60 overflow-y-auto space-y-2">
                    {categories.map(cat => (
                        <div key={cat.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`cat-${cat.id}`}
                                checked={settings.categoryIds.includes(cat.id)}
                                onChange={() => dispatch(toggleCategory(cat.id))}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor={`cat-${cat.id}`} className="font-normal cursor-pointer select-none">
                                {cat.name}
                            </Label>
                        </div>
                    ))}
                    {categories.length === 0 && <p className="text-sm text-neutral-400">No categories found.</p>}
                </div>
            </div>
        </div>
    );
}
