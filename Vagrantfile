Vagrant.configure("2") do |config|
  # Use the official Ubuntu 20.04 box
  config.vm.box = "ubuntu/focal64"

  # Forward port 8080 on the guest to port 8080 on the host
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # Configure the virtual machine provider (VirtualBox in this case)
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  # Provision Docker on the virtual machine
  config.vm.provision "docker" do |d|
    d.pull_images("nginx:latest")

    # Run a simple Nginx container
    d.run "nginx_container",
      image: "nginx:latest",
      args: "-p 8080:80",
      auto_assign_name: true
  end
end
