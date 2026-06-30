import { IconFileFilled, IconFolder, IconVideo, IconPolaroid } from '@tabler/icons-react';

export default function getIcon(ext: string) {
    if (ext === "folder") {
        return <IconFolder size={60} color='red'/>
    } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
        return <IconPolaroid size={60} color='red'/>
    } else if (ext === ".mp4" || ext === ".mov" || ext === ".avi") {
        return <IconVideo size={60} color='red'/>
    } else {
        return <IconFileFilled size={60} color='red'/>
    }
}