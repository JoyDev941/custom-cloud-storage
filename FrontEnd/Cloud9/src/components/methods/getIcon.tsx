
     export default function getIcon(ext : string){

        if(ext === ".png" || ext === ".jpg" || ext === ".jpeg") return "🖼️"
        if(ext === ".pdf") return "📄"
        if(ext === ".txt") return "📝"
        if(ext === ".mp4" || ext === ".mov") return "🎥"
        if(ext === ".mp3") return "🎵"

        return "📁"
    }