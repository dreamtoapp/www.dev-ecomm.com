import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

interface SocailProps {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

const SocialMedia = ({ facebook, instagram, twitter, linkedin }: SocailProps) => (
  <div className="flex items-center justify-center  gap-8">
    {[
      { icon: <FacebookIcon size={20} />, link: facebook, label: "Facebook" },
      { icon: <InstagramIcon size={20} />, link: instagram, label: "Instagram" },
      { icon: <TwitterIcon size={20} />, link: twitter, label: "Twitter" },
      { icon: <LinkedinIcon size={20} />, link: linkedin, label: "LinkedIn" },
    ].map((social, index) => (
      <a
        key={index}
        href={social.link}
        aria-label={social.label}
        className="text-muted-foreground hover:text-primary transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {social.icon}
      </a>
    ))}
  </div>
);
export default SocialMedia;
