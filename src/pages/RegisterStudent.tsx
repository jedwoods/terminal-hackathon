import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from '@/components/Terminal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    member1: '',
    member2: '',
    member3: '',
    school: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert('Registration submitted! (This is a demo)');
  };

  return (
    <Terminal title="STUDENT_REGISTRATION_PORTAL">
      <div className="text-glow">
        <p className="text-accent mb-4">{`> STUDENT REGISTRATION FORM`}</p>
        <p className="text-muted-foreground mb-6">
          {`> Fill in the details below to register your team for HACKATHON 2026`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1">{`> TEAM_NAME:`}</label>
            <Input
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Enter team name..."
              required
            />
          </div>

          <div>
            <label className="block mb-1">{`> MEMBER_1 (Required):`}</label>
            <Input
              value={formData.member1}
              onChange={(e) => setFormData({ ...formData, member1: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Full name..."
              required
            />
          </div>

          <div>
            <label className="block mb-1">{`> MEMBER_2 (Optional):`}</label>
            <Input
              value={formData.member2}
              onChange={(e) => setFormData({ ...formData, member2: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Full name..."
            />
          </div>

          <div>
            <label className="block mb-1">{`> MEMBER_3 (Optional):`}</label>
            <Input
              value={formData.member3}
              onChange={(e) => setFormData({ ...formData, member3: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Full name..."
            />
          </div>

          <div>
            <label className="block mb-1">{`> SCHOOL:`}</label>
            <Input
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="School name..."
              required
            />
          </div>

          <div>
            <label className="block mb-1">{`> EMAIL:`}</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="contact@email.com..."
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/80 font-mono"
            >
              [SUBMIT]
            </Button>
            <Link to="/">
              <Button
                type="button"
                variant="outline"
                className="border-primary text-foreground hover:bg-secondary font-mono"
              >
                [BACK]
              </Button>
            </Link>
          </div>
        </form>

        <p className="mt-8 text-muted-foreground text-sm">
          {`> Questions? Contact hackathon@school.edu`}
        </p>
      </div>
    </Terminal>
  );
};

export default RegisterStudent;
