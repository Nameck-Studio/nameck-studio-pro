import Avatar from '@components/ui/Avatar';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl?: string;
}

function TeamMember({ name, role, imageUrl }: TeamMemberProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Avatar name={name} src={imageUrl} size="lg" />
      <div>
        <h3 className="text-text-primary font-semibold">{name}</h3>
        <p className="text-text-secondary text-sm">{role}</p>
      </div>
    </div>
  );
}

export default TeamMember;
