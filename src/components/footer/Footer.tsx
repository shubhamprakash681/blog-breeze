import React from "react";
import { Button } from "../ui";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-muted">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 justify-center text-center md:grid-cols-2 md:justify-start md:text-start lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About
            </h4>
            <p className="text-sm text-mutedForeground">
              Learn more about our company and mission.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-mutedForeground">
              <li>Technology</li>
              <li>Science</li>
              <li>Culture</li>
              <li>Business</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-mutedForeground">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Subscribe
            </h4>

            <input
              placeholder="Enter your email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-background"
            />
            <Button className="w-full">Subscribe</Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          © 2024 Blog Breeze. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
