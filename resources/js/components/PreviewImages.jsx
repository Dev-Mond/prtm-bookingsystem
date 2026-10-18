import { useEffect, useId, useState } from 'react';
import Icon from './Icon';
import { validatePreviewFiles } from '../data/dashboard';

export default function PreviewImages({ single = false }) {
    const id = useId();
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const urls = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setImages(urls);
        return () => urls.forEach((image) => URL.revokeObjectURL(image.url));
    }, [files]);
    return (
        <div className="preview-images">
            <label className="image-picker" htmlFor={id}>
                <Icon name="plus" size={24} />
                <strong>
                    {single ? 'Change avatar' : 'Choose listing photos'}
                </strong>
                <span>
                    JPEG, PNG, WebP · Up to 5 MB each
                    {single ? '' : ' · 6 images maximum'}
                </span>
            </label>
            <input
                id={id}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple={!single}
                aria-describedby={`${id}-help ${id}-error`}
                onChange={(event) => {
                    const next = Array.from(event.target.files || []);
                    const message = validatePreviewFiles(next);
                    setError(message);
                    setFiles(message ? [] : next);
                    if (message) event.target.value = '';
                }}
            />
            <p id={`${id}-help`}>Local preview only. Files are not uploaded.</p>
            <p id={`${id}-error`} role="alert">
                {error}
            </p>
            <div
                className={`image-previews ${single ? 'image-previews--avatar' : ''}`}
            >
                {images.map((image) => (
                    <img
                        key={image.url}
                        src={image.url}
                        alt={`Selected preview: ${image.name}`}
                    />
                ))}
            </div>
            {files.length > 0 && (
                <button
                    className="text-button"
                    type="button"
                    onClick={() => {
                        setFiles([]);
                        document.getElementById(id).value = '';
                    }}
                >
                    Remove {single ? 'avatar' : 'photos'}
                </button>
            )}
        </div>
    );
}
