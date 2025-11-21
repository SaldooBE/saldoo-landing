import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface SocialProofAvatarsProps {
  images?: string[];
  count?: number;
}

export function SocialProofAvatars({ images, count = 3 }: SocialProofAvatarsProps) {
  // Use provided images or create placeholders
  const avatars = images?.slice(0, count) || Array(count).fill(null);

  return (
    <div className="flex -space-x-3">
      {avatars.map((image, index) => (
        <Avatar
          key={index}
          className="h-10 w-10 border-2 border-white ring-2 ring-white"
        >
          {image ? (
            <AvatarImage src={image} alt={`User ${index + 1}`} />
          ) : (
            <AvatarFallback className="bg-gray-200 text-gray-600">
              <Users className="h-5 w-5" />
            </AvatarFallback>
          )}
        </Avatar>
      ))}
    </div>
  );
}

