// frontend/src/components/ImageUpload.js
import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImagesChange, maxImages = 5 }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (selectedImages.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images`);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('Please select only JPEG, PNG, or WebP images');
      return;
    }

    // Validate file sizes (5MB max per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      alert('Each image must be smaller than 5MB');
      return;
    }

    // Add new files to existing ones
    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // Create previews for new files
    const newPreviews = [...previews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file,
          url: e.target.result,
          name: file.name
        });
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    // Call parent callback
    if (onImagesChange) {
      onImagesChange(newImages);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    setSelectedImages(newImages);
    setPreviews(newPreviews);
    
    if (onImagesChange) {
      onImagesChange(newImages);
    }
  };

  // Trigger file input click
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={triggerFileSelect}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-gray-400 text-4xl">📸</div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Click to upload tour images
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, WebP up to 5MB each (max {maxImages} images)
            </p>
          </div>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Choose Images
          </button>
        </div>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Selected Images ({previews.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate" title={preview.name}>
                    {preview.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(preview.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>

                {/* Primary Image Indicator */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      {previews.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">📋 Upload Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Upload high-quality images that showcase your tour destination</li>
            <li>• The first image will be used as the main tour image</li>
            <li>• Include diverse shots: landscapes, activities, accommodations</li>
            <li>• Ensure images are well-lit and clearly show the tour experience</li>
          </ul>
        </div>
      )}

      {/* Progress Indicator */}
      {selectedImages.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Upload Progress</span>
            <span className="text-sm text-gray-600">
              {selectedImages.length}/{maxImages} images
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(selectedImages.length / maxImages) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;