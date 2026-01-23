import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from '@/components/Terminal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RegisterCoach = () => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    teamCount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert('Registration submitted! (This is a demo)');
  };

  return (
    <Terminal title="COACH_REGISTRATION_PORTAL">
      <div className="text-glow">
        <p className="text-accent mb-4">{`> COACH REGISTRATION FORM`}</p>
        <p className="text-muted-foreground mb-6">
          {`> Register as a coach to sponsor teams for HACKATHON 2026`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1">{`> COACH_NAME:`}</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Your full name..."
              required
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
              placeholder="coach@school.edu..."
              required
            />
          </div>

          <div>
            <label className="block mb-1">{`> PHONE:`}</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="(555) 123-4567..."
              required
            />
          </div>

          <div>
            <label className="block mb-1">{`> EXPECTED_TEAMS:`}</label>
            <Input
              type="number"
              min="1"
              value={formData.teamCount}
              onChange={(e) => setFormData({ ...formData, teamCount: e.target.value })}
              className="bg-background border-primary text-foreground font-mono"
              placeholder="Number of teams..."
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

        <div className="mt-8 p-4 border border-border">
          <p className="text-accent">{`> COACH RESPONSIBILITIES:`}</p>
          <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
            <li>{`  ├─ Supervise your school's teams during the event`}</li>
            <li>{`  ├─ Ensure students have signed permission forms`}</li>
            <li>{`  ├─ Coordinate transportation and logistics`}</li>
            <li>{`  └─ Serve as primary contact for communication`}</li>
          </ul>
        </div>

        <p className="mt-8 text-muted-foreground text-sm">
          {`> Questions? Contact hackathon@school.edu`}
        </p>
      </div>
    </Terminal>
  );
};

export default RegisterCoach;
