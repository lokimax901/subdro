#!/usr/bin/env python3

import os
import shutil
import subprocess

# Create the static_builder module functionality
def create_static_site(source_dir='client', output_dir='build'):
    """
    Build the React app and prepare it for deployment
    """
    # Ensure we're in the right directory
    os.chdir(source_dir)
    
    # Run npm build to create the production build
    print("Building React application...")
    result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True)
    
    if result.returncode != 0:
        print("Build failed:")
        print(result.stderr)
        exit(1)
    
    print("Build completed successfully!")
    return True

# Main execution
if __name__ == "__main__":
    print("Starting build process...")
    create_static_site()
    print("Build process completed!")
