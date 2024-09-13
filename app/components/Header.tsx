import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchInput from './SearchInput';

const avatarStyles = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-smile',
  'bottts',
  'croodles',
  'dylan',
  'fun-emoji',
  'glass',
  'identicon',
  'initials',
  'lorelei',
  'micah',
  'miniavs',
  'open-peeps',
  'pixel-art',
];

const getRandomAvatarStyle = () => {
  return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
};

const getAvatar = () => {
  const style = getRandomAvatarStyle();
  return {
    style: style,
    src: `https://api.dicebear.com/9.x/${style}/svg`,
  };
};

const Header = () => {
  const avatar = getAvatar();

  return (
    <header className="flex items-center justify-between py-4 px-10 shadow-sm shadow-gray-300">
      <Avatar className="w-11 h-11 border border-gray-300">
        <AvatarImage src={avatar.src} alt={`Avatar with ${avatar.style} style`} />
        <AvatarFallback>{avatar.style.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold">Fun APIs</h1>
      <SearchInput />
    </header>
  );
};

export { Header };
