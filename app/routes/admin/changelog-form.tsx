import { type LoaderFunctionArgs, type ActionFunctionArgs, redirect } from "react-router";
import { useLoaderData, Form, useNavigation } from "react-router";
import { getChangelogById, createChangelog, updateChangelog } from "~/server/changelog.server";
import { requireUserId } from "~/server/session.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { X, Plus } from "lucide-react";
import { useState } from "react";

export async function loader({ request, params }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");

    const id = params.id;
    if (id && id !== "new") {
        const changelog = await getChangelogById(Number(id));
        if (!changelog) {
            throw new Response("Changelog not found", { status: 404 });
        }
        return { changelog };
    }

    return { changelog: null };
}

export async function action({ request, params }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");

    const formData = await request.formData();
    const id = params.id;

    // Parse form data
    const version = formData.get("version") as string;
    const isUpcoming = formData.get("isUpcoming") === "true";
    const tag = formData.get("tag") as string | null;
    const expectedDate = formData.get("expectedDate") as string | null;
    const releaseDateStr = formData.get("releaseDate") as string | null;
    const releaseDate = releaseDateStr ? new Date(releaseDateStr) : null;
    const isPublished = formData.get("isPublished") === "true";

    // Parse array fields
    const featuresJson = formData.get("features") as string;
    const fixesJson = formData.get("fixes") as string;
    const improvementsJson = formData.get("improvements") as string;

    const features = featuresJson ? JSON.parse(featuresJson) : [];
    const fixes = fixesJson ? JSON.parse(fixesJson) : [];
    const improvements = improvementsJson ? JSON.parse(improvementsJson) : [];

    const data = {
        version,
        isUpcoming,
        tag: tag || null,
        expectedDate: expectedDate || null,
        releaseDate,
        features,
        fixes,
        improvements,
        isPublished,
    };

    try {
        if (id && id !== "new") {
            await updateChangelog(Number(id), data);
        } else {
            await createChangelog(data);
        }
        return redirect("/admin/changelog");
    } catch (error) {
        return { error: "Failed to save changelog" };
    }
}

export default function ChangelogFormPage() {
    const { changelog } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    // State for dynamic arrays
    const [features, setFeatures] = useState<string[]>(
        changelog?.features as string[] || [""]
    );
    const [fixes, setFixes] = useState<string[]>(
        changelog?.fixes as string[] || [""]
    );
    const [improvements, setImprovements] = useState<string[]>(
        changelog?.improvements as string[] || [""]
    );
    const [isUpcoming, setIsUpcoming] = useState(changelog?.isUpcoming || false);
    const [isPublished, setIsPublished] = useState(changelog?.isPublished ?? true);

    const formatDateForInput = (date: Date | null | undefined) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const addItem = (type: 'features' | 'fixes' | 'improvements') => {
        if (type === 'features') setFeatures([...features, ""]);
        if (type === 'fixes') setFixes([...fixes, ""]);
        if (type === 'improvements') setImprovements([...improvements, ""]);
    };

    const removeItem = (type: 'features' | 'fixes' | 'improvements', index: number) => {
        if (type === 'features') setFeatures(features.filter((_, i) => i !== index));
        if (type === 'fixes') setFixes(fixes.filter((_, i) => i !== index));
        if (type === 'improvements') setImprovements(improvements.filter((_, i) => i !== index));
    };

    const updateItem = (type: 'features' | 'fixes' | 'improvements', index: number, value: string) => {
        if (type === 'features') {
            const newFeatures = [...features];
            newFeatures[index] = value;
            setFeatures(newFeatures);
        }
        if (type === 'fixes') {
            const newFixes = [...fixes];
            newFixes[index] = value;
            setFixes(newFixes);
        }
        if (type === 'improvements') {
            const newImprovements = [...improvements];
            newImprovements[index] = value;
            setImprovements(newImprovements);
        }
    };

    return (
        <PermissionGuard
            require={changelog ? "edit_changelogs" : "create_changelogs"}
            fallback={<div>Access Denied</div>}
        >
            <div className="space-y-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold font-metropolis mb-2">
                        {changelog ? 'Edit Developer Notes' : 'Tambah Developer Notes Baru'}
                    </h1>
                    <p className="text-neutral-500">
                        {changelog ? 'Update informasi versi dan fitur' : 'Buat catatan untuk versi baru'}
                    </p>
                </div>

                <Form method="post" className="space-y-6 bg-white p-6 rounded-lg border border-neutral-200">
                    {/* Hidden fields for arrays */}
                    <input type="hidden" name="features" value={JSON.stringify(features.filter(f => f.trim()))} />
                    <input type="hidden" name="fixes" value={JSON.stringify(fixes.filter(f => f.trim()))} />
                    <input type="hidden" name="improvements" value={JSON.stringify(improvements.filter(i => i.trim()))} />
                    <input type="hidden" name="isUpcoming" value={isUpcoming.toString()} />
                    <input type="hidden" name="isPublished" value={isPublished.toString()} />

                    {/* Version */}
                    <div className="space-y-2">
                        <Label htmlFor="version">Version *</Label>
                        <Input
                            id="version"
                            name="version"
                            placeholder="2.1.0"
                            defaultValue={changelog?.version}
                            required
                        />
                        <p className="text-xs text-neutral-500">Format: X.Y.Z (contoh: 2.1.0)</p>
                    </div>

                    {/* Upcoming Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="isUpcoming"
                            type="checkbox"
                            checked={isUpcoming}
                            onChange={(e) => setIsUpcoming(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300"
                        />
                        <Label htmlFor="isUpcoming" className="cursor-pointer">
                            Ini adalah versi upcoming (Update Mendatang)
                        </Label>
                    </div>

                    {/* Conditional Fields */}
                    {isUpcoming ? (
                        <div className="space-y-2">
                            <Label htmlFor="expectedDate">Expected Release Date</Label>
                            <Input
                                id="expectedDate"
                                name="expectedDate"
                                placeholder="Q1 2026"
                                defaultValue={changelog?.expectedDate || ''}
                            />
                            <p className="text-xs text-neutral-500">Contoh: Q1 2026, Maret 2026, Coming Soon</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="releaseDate">Release Date *</Label>
                            <Input
                                id="releaseDate"
                                name="releaseDate"
                                type="date"
                                defaultValue={formatDateForInput(changelog?.releaseDate)}
                                required={!isUpcoming}
                            />
                        </div>
                    )}

                    {/* Tag */}
                    <div className="space-y-2">
                        <Label htmlFor="tag">Tag (Optional)</Label>
                        <Input
                            id="tag"
                            name="tag"
                            placeholder="Latest, Stable, Beta, etc."
                            defaultValue={changelog?.tag || ''}
                        />
                        <p className="text-xs text-neutral-500">Badge yang akan ditampilkan di samping version</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Features</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem('features')}
                                className="gap-1"
                            >
                                <Plus size={14} /> Add Feature
                            </Button>
                        </div>
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={feature}
                                    onChange={(e) => updateItem('features', index, e.target.value)}
                                    placeholder="Deskripsi fitur baru..."
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem('features', index)}
                                    className="shrink-0"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Bug Fixes */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Bug Fixes</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem('fixes')}
                                className="gap-1"
                            >
                                <Plus size={14} /> Add Fix
                            </Button>
                        </div>
                        {fixes.map((fix, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={fix}
                                    onChange={(e) => updateItem('fixes', index, e.target.value)}
                                    placeholder="Deskripsi bug yang diperbaiki..."
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem('fixes', index)}
                                    className="shrink-0"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Improvements */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Improvements</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem('improvements')}
                                className="gap-1"
                            >
                                <Plus size={14} /> Add Improvement
                            </Button>
                        </div>
                        {improvements.map((improvement, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={improvement}
                                    onChange={(e) => updateItem('improvements', index, e.target.value)}
                                    placeholder="Deskripsi peningkatan..."
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem('improvements', index)}
                                    className="shrink-0"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Published Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="isPublished"
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300"
                        />
                        <Label htmlFor="isPublished" className="cursor-pointer">
                            Publish catatan (tampilkan di halaman public)
                        </Label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={isSubmitting} className="flex-1">
                            {isSubmitting ? 'Menyimpan...' : changelog ? 'Update Catatan' : 'Buat Catatan'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Batal
                        </Button>
                    </div>
                </Form>
            </div>
        </PermissionGuard>
    );
}
