import React, { useState, useEffect } from "react";
import { getGalleryImages, GalleryImage } from "../sections/Gallery";
import { getSiteSettings, saveSiteSettings, SiteSettings } from "../../lib/settings";
import { Trash2, Upload, Settings, Image as ImageIcon, Save } from "lucide-react";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"gallery" | "settings">("settings");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [category, setCategory] = useState("Completed Projects");
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [saveStatus, setSaveStatus] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let subscription: any;
    
    import("../../lib/supabase").then(({ supabase }) => {
      const fetchImages = async () => {
        const { data, error } = await supabase.from('gallery').select('*').order('createdAt', { ascending: false });
        if (data && !error) {
          setImages(data.map(doc => ({ id: doc.id, src: doc.url, category: doc.category, storagePath: doc.storagePath })));
        }
      };
      
      fetchImages();
      
      subscription = supabase.channel(`admin_gallery_changes_${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => {
          fetchImages();
        })
        .subscribe();
    });

    setSettings(getSiteSettings());

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(settings);
    setSaveStatus("Saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const { supabase } = await import("../../lib/supabase");

      const storagePath = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      
      console.log("Uploading to Supabase Storage...", storagePath);
      const { error: uploadError } = await supabase.storage.from('gallery').upload(storagePath, file);
      
      if (uploadError) throw uploadError;
      
      console.log("Upload complete. Getting public URL...");
      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(storagePath);

      const { error: dbError } = await supabase.from('gallery').insert([{
        url: publicUrl,
        category,
        storagePath,
        createdAt: new Date().toISOString()
      }]);
      
      if (dbError) throw dbError;
      
      console.log("Image saved to Supabase successfully!");
      alert("Image uploaded successfully! ✅");
      
    } catch (error: any) {
      console.error("Error uploading image:", error);
      const errorMessage = error?.message || error?.code || "Unknown error";
      alert(`Failed to upload: ${errorMessage}\n\nMake sure:\n1. Supabase Storage bucket 'gallery' exists (public)\n2. Supabase Table 'gallery' exists\n3. Check browser console for details.`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string, storagePath?: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const { supabase } = await import("../../lib/supabase");
      
      // Delete from Database
      const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
      if (dbError) throw dbError;
      
      // Delete from Storage if path exists
      if (storagePath) {
        const { error: storageError } = await supabase.storage.from('gallery').remove([storagePath]);
        if (storageError) console.error("Warning: Could not delete from storage", storageError);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold text-white font-serif">Admin Dashboard</h1>
            <p className="mt-2 text-gray-300">Manage your website content directly from the browser.</p>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-gray-700 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Settings className="w-5 h-5" /> Site Content
              </button>
              <button 
                onClick={() => setActiveTab("gallery")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'gallery' ? 'bg-gray-700 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <ImageIcon className="w-5 h-5" /> Gallery Manager
              </button>
            </div>
          </div>
          
          <div className="px-6 py-8 sm:px-10">
            {activeTab === "settings" && (
              <form onSubmit={handleSaveSettings} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Hero Section</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 1</label>
                      <input type="text" name="heroTitle1" value={settings.heroTitle1} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 2</label>
                      <input type="text" name="heroTitle2" value={settings.heroTitle2} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input type="text" name="heroSubtitle" value={settings.heroSubtitle} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                      <input type="text" name="heroBackgroundImage" value={settings.heroBackgroundImage} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="https://..." />
                      <p className="text-xs text-gray-500 mt-1">Paste an image URL to change the home screen background.</p>
                      
                      {settings.heroBackgroundImage && (
                        <div className="mt-4 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200">
                          <img src={settings.heroBackgroundImage} alt="Hero Background Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">About Section</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                      <input type="text" name="aboutTitle" value={settings.aboutTitle} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CEO Name</label>
                      <input type="text" name="aboutCeoName" value={settings.aboutCeoName} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CEO Role</label>
                      <input type="text" name="aboutCeoRole" value={settings.aboutCeoRole} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">CEO Description</label>
                      <textarea name="aboutCeoDesc" value={settings.aboutCeoDesc} onChange={handleSettingsChange} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Contact Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="text" name="contactEmail" value={settings.contactEmail} onChange={handleSettingsChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                      <textarea name="contactAddress" value={settings.contactAddress} onChange={handleSettingsChange} rows={2} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-green-600 font-medium">{saveStatus}</span>
                  <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-900 font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md">
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === "gallery" && (
              <>
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Photo</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full sm:w-64 flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-600"
                      >
                        <option value="Completed Projects">Completed Projects</option>
                        <option value="Ongoing Projects">Ongoing Projects</option>
                        <option value="Interiors">Interiors</option>
                        <option value="Site Works">Site Works</option>
                      </select>
                    </div>
                    
                    <div className="w-full relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className={`absolute inset-0 w-full h-full opacity-0 ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}
                      />
                      <div className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 px-4 py-2 rounded-md flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        <span className="font-medium">{isUploading ? "Uploading to Cloud..." : "Select Image"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Current Gallery ({images.length})</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map(img => (
                      <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                        <img src={img.src} alt="Gallery item" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-white text-xs mb-2 font-medium bg-black/50 px-2 py-1 rounded">{img.category}</span>
                          <button 
                            onClick={() => handleDelete(img.id as any, (img as any).storagePath)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {images.length === 0 && (
                      <div className="col-span-full py-12 text-center text-gray-500 bg-gray-300 rounded-lg border border-dashed border-gray-300">
                        No images in the gallery yet.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
