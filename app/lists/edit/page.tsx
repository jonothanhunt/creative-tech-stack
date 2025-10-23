"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ItemWithId, Link } from '@/lib/db';
import { updateItemAction, insertItemAction, deleteItemAction } from '@/lib/actions';

export default function EditPage() {
    const [items, setItems] = useState<ItemWithId[]>([]);
    const [filters, setFilters] = useState<{ categories: string[]; types: string[]; stacks: string[] }>({ categories: [], types: [], stacks: [] });
    const [isAdding, setIsAdding] = useState(false);
    const [processedFiles, setProcessedFiles] = useState<{ [key: number]: File | null }>({});
    const [editingLinks, setEditingLinks] = useState<{ [key: number]: Link[] }>({});

    // For add form
    const [addCategories, setAddCategories] = useState<string[]>([]);
    const [addStacks, setAddStacks] = useState<string[]>([]);
    const [addCategoryInput, setAddCategoryInput] = useState('');
    const [addStackInput, setAddStackInput] = useState('');
    const [showAddCategoryDropdown, setShowAddCategoryDropdown] = useState(false);
    const [showAddStackDropdown, setShowAddStackDropdown] = useState(false);

    // For edit forms
    const [editCategories, setEditCategories] = useState<{ [key: number]: string[] }>({});
    const [editStacks, setEditStacks] = useState<{ [key: number]: string[] }>({});
    const [editCategoryInputs, setEditCategoryInputs] = useState<{ [key: number]: string }>({});
    const [editStackInputs, setEditStackInputs] = useState<{ [key: number]: string }>({});
    const [showEditCategoryDropdowns, setShowEditCategoryDropdowns] = useState<{ [key: number]: boolean }>({});
    const [showEditStackDropdowns, setShowEditStackDropdowns] = useState<{ [key: number]: boolean }>({});

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');

    // Edit form states for controlled inputs
    const [editNames, setEditNames] = useState<{ [key: number]: string }>({});
    const [editDescriptions, setEditDescriptions] = useState<{ [key: number]: string }>({});
    const [editTypes, setEditTypes] = useState<{ [key: number]: string }>({});
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<{ [key: number]: boolean }>({});
    const [saveStatus, setSaveStatus] = useState<{ [key: number]: 'saved' | 'saving' | 'unsaved' }>({});

    useEffect(() => {
        fetchItems();
        fetchFilters();
    }, []);

    const fetchItems = async () => {
        const res = await fetch('/api/items');
        const data = await res.json();
        setItems(data);
        // Initialize editing links
        const links: { [key: number]: Link[] } = {};
        data.forEach((item: ItemWithId) => {
            links[item.id] = [...item.links];
        });
        setEditingLinks(links);

        // Initialize edit states
        const categories: { [key: number]: string[] } = {};
        const stacks: { [key: number]: string[] } = {};
        const categoryInputs: { [key: number]: string } = {};
        const stackInputs: { [key: number]: string } = {};
        const names: { [key: number]: string } = {};
        const descriptions: { [key: number]: string } = {};
        const types: { [key: number]: string } = {};
        const unsavedChanges: { [key: number]: boolean } = {};
        const saveStatuses: { [key: number]: 'saved' | 'saving' | 'unsaved' } = {};
        data.forEach((item: ItemWithId) => {
            categories[item.id] = [...item.categories];
            stacks[item.id] = [...item.stacks];
            categoryInputs[item.id] = '';
            stackInputs[item.id] = '';
            names[item.id] = item.name;
            descriptions[item.id] = item.description;
            types[item.id] = item.type;
            unsavedChanges[item.id] = false;
            saveStatuses[item.id] = 'saved';
        });
        setEditCategories(categories);
        setEditStacks(stacks);
        setEditCategoryInputs(categoryInputs);
        setEditStackInputs(stackInputs);
        setEditNames(names);
        setEditDescriptions(descriptions);
        setEditTypes(types);
        setHasUnsavedChanges(unsavedChanges);
        setSaveStatus(saveStatuses);
    };

    const fetchFilters = async () => {
        const res = await fetch('/api/filters');
        const data = await res.json();
        setFilters(data);
    };

    const handleFileChange = async (itemId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const processed = await processImage(file);
        setProcessedFiles(prev => ({ ...prev, [itemId]: processed }));
        updateUnsavedChanges(itemId);
    };

    const processImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d')!;
                    const maxWidth = 512;
                    const scale = Math.min(1, maxWidth / img.width);
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const processedFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                            resolve(processedFile);
                        }
                    }, 'image/jpeg', 0.8);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        return data.url;
    };

    const handleSave = async (item: ItemWithId) => {
        setSaveStatus(prev => ({ ...prev, [item.id]: 'saving' }));

        const name = editNames[item.id] || item.name;
        const description = editDescriptions[item.id] || item.description;
        const type = editTypes[item.id] || item.type;
        const categories = editCategories[item.id] || item.categories;
        const stacks = editStacks[item.id] || item.stacks;
        const links = editingLinks[item.id] || [];

        let imageUrl = item.image;
        if (processedFiles[item.id]) {
            imageUrl = await uploadImage(processedFiles[item.id]!);
        }

        await updateItemAction(item.id, name, description, imageUrl, item.image, type, categories, stacks, links);
        setProcessedFiles(prev => ({ ...prev, [item.id]: null }));
        setHasUnsavedChanges(prev => ({ ...prev, [item.id]: false }));
        setSaveStatus(prev => ({ ...prev, [item.id]: 'saved' }));
        fetchItems();
    };

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const type = formData.get('type') as string;
        const categories = addCategories;
        const stacks = addStacks;
        const links: Link[] = [];

        let imageUrl = '';
        if (processedFiles[-1]) {
            imageUrl = await uploadImage(processedFiles[-1]!);
        }

        await insertItemAction(type, name, description, imageUrl, categories, stacks, links);
        setIsAdding(false);
        setProcessedFiles(prev => ({ ...prev, [-1]: null }));
        setAddCategories([]);
        setAddStacks([]);
        setAddCategoryInput('');
        setAddStackInput('');
        fetchItems();
    };

    const handleDelete = async (item: ItemWithId) => {
        if (confirm('Are you sure?')) {
            await deleteItemAction(item.id, item.image);
            fetchItems();
        }
    };

    const addLink = (itemId: number) => {
        setEditingLinks(prev => ({
            ...prev,
            [itemId]: [...(prev[itemId] || []), { title: '', url: '' }]
        }));
        updateUnsavedChanges(itemId);
    };

    const updateLink = (itemId: number, index: number, field: 'title' | 'url', value: string) => {
        setEditingLinks(prev => {
            const newLinks = [...(prev[itemId] || [])];
            newLinks[index] = { ...newLinks[index], [field]: value };
            return { ...prev, [itemId]: newLinks };
        });
        updateUnsavedChanges(itemId);
    };

    const removeLink = (itemId: number, index: number) => {
        setEditingLinks(prev => {
            const newLinks = (prev[itemId] || []).filter((_, i) => i !== index);
            return { ...prev, [itemId]: newLinks };
        });
        updateUnsavedChanges(itemId);
    };

    // Combo box helpers for add form
    const addCategory = (category: string) => {
        if (category && !addCategories.includes(category)) {
            setAddCategories(prev => [...prev, category]);
        }
        setAddCategoryInput('');
        setShowAddCategoryDropdown(false);
    };

    const removeAddCategory = (category: string) => {
        setAddCategories(prev => prev.filter(c => c !== category));
    };

    const handleAddCategoryKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            addCategory(addCategoryInput.trim());
        }
    };

    const addStack = (stack: string) => {
        if (stack && !addStacks.includes(stack)) {
            setAddStacks(prev => [...prev, stack]);
        }
        setAddStackInput('');
        setShowAddStackDropdown(false);
    };

    const removeAddStack = (stack: string) => {
        setAddStacks(prev => prev.filter(s => s !== stack));
    };

    const handleAddStackKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            addStack(addStackInput.trim());
        }
    };

    // Combo box helpers for edit forms
    const addEditCategory = (itemId: number, category: string) => {
        if (category && !editCategories[itemId]?.includes(category)) {
            setEditCategories(prev => ({
                ...prev,
                [itemId]: [...(prev[itemId] || []), category]
            }));
            updateUnsavedChanges(itemId);
        }
        setEditCategoryInputs(prev => ({ ...prev, [itemId]: '' }));
        setShowEditCategoryDropdowns(prev => ({ ...prev, [itemId]: false }));
    };

    const removeEditCategory = (itemId: number, category: string) => {
        setEditCategories(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || []).filter(c => c !== category)
        }));
        updateUnsavedChanges(itemId);
    };

    const handleEditCategoryKeyDown = (itemId: number, e: React.KeyboardEvent) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            addEditCategory(itemId, editCategoryInputs[itemId]?.trim() || '');
        }
    };

    const addEditStack = (itemId: number, stack: string) => {
        if (stack && !editStacks[itemId]?.includes(stack)) {
            setEditStacks(prev => ({
                ...prev,
                [itemId]: [...(prev[itemId] || []), stack]
            }));
            updateUnsavedChanges(itemId);
        }
        setEditStackInputs(prev => ({ ...prev, [itemId]: '' }));
        setShowEditStackDropdowns(prev => ({ ...prev, [itemId]: false }));
    };

    const removeEditStack = (itemId: number, stack: string) => {
        setEditStacks(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || []).filter(s => s !== stack)
        }));
        updateUnsavedChanges(itemId);
    };

    const handleEditStackKeyDown = (itemId: number, e: React.KeyboardEvent) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            addEditStack(itemId, editStackInputs[itemId]?.trim() || '');
        }
    };

    // Change detection helpers
    const checkForChanges = (itemId: number) => {
        const originalItem = items.find(item => item.id === itemId);
        if (!originalItem) return false;

        const nameChanged = editNames[itemId] !== originalItem.name;
        const descChanged = editDescriptions[itemId] !== originalItem.description;
        const typeChanged = editTypes[itemId] !== originalItem.type;
        const categoriesChanged = JSON.stringify(editCategories[itemId] || []) !== JSON.stringify(originalItem.categories);
        const stacksChanged = JSON.stringify(editStacks[itemId] || []) !== JSON.stringify(originalItem.stacks);
        const linksChanged = JSON.stringify(editingLinks[itemId] || []) !== JSON.stringify(originalItem.links);
        const imageChanged = !!processedFiles[itemId];

        return nameChanged || descChanged || typeChanged || categoriesChanged || stacksChanged || linksChanged || imageChanged;
    };

    const updateUnsavedChanges = (itemId: number) => {
        const hasChanges = checkForChanges(itemId);
        setHasUnsavedChanges(prev => ({ ...prev, [itemId]: hasChanges }));
        if (hasChanges && saveStatus[itemId] === 'saved') {
            setSaveStatus(prev => ({ ...prev, [itemId]: 'unsaved' }));
        }
    };

    // Filter items based on selected filters
    const filteredItems = items.filter(item => {
        const matchesCategory = !selectedCategory || item.categories.includes(selectedCategory);
        const matchesType = !selectedType || item.type === selectedType;
        return matchesCategory && matchesType;
    });

    return (
        <div className="p-4 bg-red-900 min-h-screen">
            <h1 className="text-2xl mb-4 text-white">Edit Items</h1>
            <button onClick={() => setIsAdding(true)} className="bg-blue-500 text-white px-4 py-2 mb-4">Add New Item</button>
            
            {/* Filters */}
            <div className="mb-4 flex gap-4">
                <div>
                    <label className="text-white mr-2">Filter by Category:</label>
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border p-2 bg-red-800 text-white"
                    >
                        <option value="">All Categories</option>
                        {filters.categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white mr-2">Filter by Type:</label>
                    <select 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border p-2 bg-red-800 text-white"
                    >
                        <option value="">All Types</option>
                        {filters.types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 border p-4 bg-red-800">
                    <h2 className="text-xl mb-4 text-white">Add New Item</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-white">Name</label>
                            <input name="name" required className="border w-full p-2" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-white">Description</label>
                            <textarea name="description" className="border w-full p-2" />
                        </div>
                        <div>
                            <label className="text-white">Type</label>
                            <select name="type" className="border w-full p-2">
                                {filters.types.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-white">Categories</label>
                            <div className="border p-2 min-h-[40px] bg-red-900">
                                <div className="flex flex-wrap gap-1 mb-1">
                                    {addCategories.map(cat => (
                                        <span key={cat} className="bg-ct-primary/20 text-ct-primary px-2 py-1 rounded text-sm flex items-center gap-1">
                                            {cat}
                                            <button type="button" onClick={() => removeAddCategory(cat)} className="text-ct-primary hover:text-red-600">×</button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={addCategoryInput}
                                        onChange={(e) => setAddCategoryInput(e.target.value)}
                                        onKeyDown={handleAddCategoryKeyDown}
                                        onFocus={() => setShowAddCategoryDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowAddCategoryDropdown(false), 200)}
                                        placeholder="Type to add categories..."
                                        className="w-full outline-none text-white placeholder-gray-300"
                                    />
                                    {showAddCategoryDropdown && (
                                        <div className="absolute top-full left-0 right-0 bg-red-900 border border-gray-300 max-h-40 overflow-y-auto z-10">
                                            {filters.categories
                                                .filter(cat => cat.toLowerCase().includes(addCategoryInput.toLowerCase()) && !addCategories.includes(cat))
                                                .map(cat => (
                                                    <div
                                                        key={cat}
                                                        onClick={() => addCategory(cat)}
                                                        className="p-2 hover:bg-red-800 cursor-pointer text-white"
                                                    >
                                                        {cat}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-white">Stacks</label>
                            <div className="border p-2 min-h-[40px] bg-red-900">
                                <div className="flex flex-wrap gap-1 mb-1">
                                    {addStacks.map(stack => (
                                        <span key={stack} className="bg-ct-primary/20 text-ct-primary px-2 py-1 rounded text-sm flex items-center gap-1">
                                            {stack}
                                            <button type="button" onClick={() => removeAddStack(stack)} className="text-ct-primary hover:text-red-600">×</button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={addStackInput}
                                        onChange={(e) => setAddStackInput(e.target.value)}
                                        onKeyDown={handleAddStackKeyDown}
                                        onFocus={() => setShowAddStackDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowAddStackDropdown(false), 200)}
                                        placeholder="Type to add stacks..."
                                        className="w-full outline-none text-white placeholder-gray-300"
                                    />
                                    {showAddStackDropdown && (
                                        <div className="absolute top-full left-0 right-0 bg-red-900 border border-gray-300 max-h-40 overflow-y-auto z-10">
                                            {filters.stacks
                                                .filter(stack => stack.toLowerCase().includes(addStackInput.toLowerCase()) && !addStacks.includes(stack))
                                                .map(stack => (
                                                    <div
                                                        key={stack}
                                                        onClick={() => addStack(stack)}
                                                        className="p-2 hover:bg-red-800 cursor-pointer text-white"
                                                    >
                                                        {stack}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-white">Image</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(-1, e)} className="border w-full p-2" />
                        {processedFiles[-1] && <p>Processed image ready</p>}
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 mr-2">Add</button>
                    <button type="button" onClick={() => { 
                        setIsAdding(false); 
                        setProcessedFiles(prev => ({ ...prev, [-1]: null })); 
                        setAddCategories([]);
                        setAddStacks([]);
                        setAddCategoryInput('');
                        setAddStackInput('');
                    }} className="bg-gray-500 text-white px-4 py-2">Cancel</button>
                </form>
            )}
            <div className="space-y-4">
                {filteredItems.map((item) => (
                    <div key={item.id} className="border p-4 bg-red-800">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-white">Name</label>
                                <input 
                                    value={editNames[item.id] || ''} 
                                    onChange={(e) => {
                                        setEditNames(prev => ({ ...prev, [item.id]: e.target.value }));
                                        updateUnsavedChanges(item.id);
                                    }} 
                                    className="border w-full p-2 mb-2" 
                                />
                                <label className="text-white">Description</label>
                                <textarea 
                                    value={editDescriptions[item.id] || ''} 
                                    onChange={(e) => {
                                        setEditDescriptions(prev => ({ ...prev, [item.id]: e.target.value }));
                                        updateUnsavedChanges(item.id);
                                    }} 
                                    className="border w-full p-2" 
                                />
                            </div>
                            <div>
                                <label className="text-white">Type</label>
                                <select 
                                    value={editTypes[item.id] || ''} 
                                    onChange={(e) => {
                                        setEditTypes(prev => ({ ...prev, [item.id]: e.target.value }));
                                        updateUnsavedChanges(item.id);
                                    }} 
                                    className="border w-full p-2 mb-2"
                                >
                                    {filters.types.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                                <label className="text-white">Categories</label>
                                <div className="border p-2 min-h-[40px] bg-red-900 mb-2">
                                    <div className="flex flex-wrap gap-1 mb-1">
                                        {(editCategories[item.id] || []).map(cat => (
                                            <span key={cat} className="bg-ct-primary/20 text-ct-primary px-2 py-1 rounded text-sm flex items-center gap-1">
                                                {cat}
                                                <button type="button" onClick={() => removeEditCategory(item.id, cat)} className="text-ct-primary hover:text-red-600">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={editCategoryInputs[item.id] || ''}
                                            onChange={(e) => setEditCategoryInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                                            onKeyDown={(e) => handleEditCategoryKeyDown(item.id, e)}
                                            onFocus={() => setShowEditCategoryDropdowns(prev => ({ ...prev, [item.id]: true }))}
                                            onBlur={() => setTimeout(() => setShowEditCategoryDropdowns(prev => ({ ...prev, [item.id]: false })), 200)}
                                            placeholder="Type to add categories..."
                                            className="w-full outline-none text-white placeholder-gray-300"
                                        />
                                        {showEditCategoryDropdowns[item.id] && (
                                            <div className="absolute top-full left-0 right-0 bg-red-900 border border-gray-300 max-h-40 overflow-y-auto z-10">
                                                {filters.categories
                                                    .filter(cat => cat.toLowerCase().includes((editCategoryInputs[item.id] || '').toLowerCase()) && !(editCategories[item.id] || []).includes(cat))
                                                    .map(cat => (
                                                        <div
                                                            key={cat}
                                                            onClick={() => addEditCategory(item.id, cat)}
                                                            className="p-2 hover:bg-red-800 cursor-pointer text-white"
                                                        >
                                                            {cat}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <label className="text-white">Stacks</label>
                                <div className="border p-2 min-h-[40px] bg-red-900 mb-2">
                                    <div className="flex flex-wrap gap-1 mb-1">
                                        {(editStacks[item.id] || []).map(stack => (
                                            <span key={stack} className="bg-ct-primary/20 text-ct-primary px-2 py-1 rounded text-sm flex items-center gap-1">
                                                {stack}
                                                <button type="button" onClick={() => removeEditStack(item.id, stack)} className="text-ct-primary hover:text-red-600">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={editStackInputs[item.id] || ''}
                                            onChange={(e) => setEditStackInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                                            onKeyDown={(e) => handleEditStackKeyDown(item.id, e)}
                                            onFocus={() => setShowEditStackDropdowns(prev => ({ ...prev, [item.id]: true }))}
                                            onBlur={() => setTimeout(() => setShowEditStackDropdowns(prev => ({ ...prev, [item.id]: false })), 200)}
                                            placeholder="Type to add stacks..."
                                            className="w-full outline-none text-white placeholder-gray-300"
                                        />
                                        {showEditStackDropdowns[item.id] && (
                                            <div className="absolute top-full left-0 right-0 bg-red-900 border border-gray-300 max-h-40 overflow-y-auto z-10">
                                                {filters.stacks
                                                    .filter(stack => stack.toLowerCase().includes((editStackInputs[item.id] || '').toLowerCase()) && !(editStacks[item.id] || []).includes(stack))
                                                    .map(stack => (
                                                        <div
                                                            key={stack}
                                                            onClick={() => addEditStack(item.id, stack)}
                                                            className="p-2 hover:bg-red-800 cursor-pointer text-white"
                                                        >
                                                            {stack}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <label className="text-white">Image</label>
                                <div className="flex items-center mb-2">
                                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(item.id, e)} className="border p-2 mr-2 flex-1" />
                                    <div className="w-16 h-16 border bg-transparent hover:bg-ct-primary transition-colors flex-shrink-0">
                                        {item.image && item.image.startsWith('https://blob.vercel-storage.com/') && <Image src={item.image} alt="Current" width={64} height={64} className="object-cover w-full h-full" />}
                                    </div>
                                </div>
                                {processedFiles[item.id] && <p>Processed image ready</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-white">Links</label>
                            {(editingLinks[item.id] || []).map((link, i) => (
                                <div key={i} className="flex mb-2">
                                    <input value={link.title} onChange={(e) => updateLink(item.id, i, 'title', e.target.value)} placeholder="Title" className="border p-2 mr-2 flex-1" />
                                    <input value={link.url} onChange={(e) => updateLink(item.id, i, 'url', e.target.value)} placeholder="URL" className="border p-2 mr-2 flex-1" />
                                    <button type="button" onClick={() => removeLink(item.id, i)} className="bg-red-500 text-white px-2">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addLink(item.id)} className="bg-green-500 text-white px-2 py-1">Add Link</button>
                        </div>
                        <div className="flex justify-between">
                            <button 
                                onClick={() => handleSave(item)} 
                                disabled={saveStatus[item.id] === 'saving'}
                                className={`px-4 py-2 ${
                                    saveStatus[item.id] === 'saving' 
                                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                                        : hasUnsavedChanges[item.id] 
                                            ? 'bg-blue-500 text-white animate-pulse' 
                                            : 'bg-gray-500 text-gray-300'
                                }`}
                            >
                                {saveStatus[item.id] === 'saving' 
                                    ? 'Saving...' 
                                    : hasUnsavedChanges[item.id] 
                                        ? 'Save Changes' 
                                        : 'Changes Saved'
                                }
                            </button>
                            <button onClick={() => handleDelete(item)} className="bg-red-500 text-white px-4 py-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}