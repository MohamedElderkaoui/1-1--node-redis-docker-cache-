Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"
    config.vm.network "forwarded_port", guest: 8081, host: 8080
    config.vm.synced_folder ".", "/vagrant", type: "nfs", disabled: true
  
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
    end
  
    config.vm.provision "docker" do |d|
      d.pull_images "docker.hub/your-image-name:latest"
      d.run "your-container-name",
        image: "docker.hub/your-image-name:latest",
        args: "-p 8081:8080",
        auto_assign_name: false
    end
  end
  