Vagrant.configure("2") do |config|
  # Set up a Ubuntu 20.04 box
  config.vm.box = "ubuntu/bionic64"

  # Forward ports
  config.vm.network "forwarded_port", guest: 8081, host: 8081

  # Install Docker and Docker Compose
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose
    sudo usermod -aG docker vagrant
    sudo systemctl enable --now docker
  SHELL

  # Share the 'app' directory with the VM
  config.vm.synced_folder "app", "/vagrant/app"

  # Provision the Docker containers
  config.vm.provision "shell", inline: <<-SHELL
    cd /vagrant
    docker-compose up -d
  SHELL
end
