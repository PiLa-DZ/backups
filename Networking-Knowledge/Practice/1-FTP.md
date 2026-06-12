```bash
# -------------------------------------------------------------
# Move 1 file
# Computer 1
scp file.txt nabil@192.168.0.199:/home/nabil/Desktop/
# -------------------------------------------------------------
# Move projects or files
# Computer 2
sudo pacman -Syu rsync
# Computer 1
sudo pacman -Syu rsync
rsync -avz my-node-project/ nabil@192.168.0.199:/home/nabil/Desktop/
# NOTE: You have to install 'rsync' in both computers

# -------------------------------------------------------------
# Computer 2
nc -l -p 9999 > received_secret.md
# Computer 1
nc 192.168.0.199 9999 < secret.md


# -------------------------------------------------------------
# How to connect over ssh
# Computer 2 IP Address 192.168.0.199
ssh nabil@192.168.0.199
# -------------------------------------------------------------
# Test SSH
ssh -vvv nabil@192.168.0.199
sudo journalctl -u sshd -n 20 --no-pager

# -------------------------------------------------------------
# Android Phone: Graphical UI Way (Using Android Apps)
#
# Install `Material Files` from play store
#
# 1. Open the app and look for an option called "Add New Storage / Network Location".
# 2. Choose SFTP or SSH Server (SFTP means SSH File Transfer Protocol—it's just a file browser running entirely inside a Port 22 SSH connection).
# 3. Type in your Arch computer's IP (192.168.0.199), your username (nabil), and your Linux login password.

# -------------------------------------------------------------
# Android Phone: Termux
termux-setup-storage # Termux permissions
pkg update && pkg upgrade
pkg install openssh rsync
rsync -avz my-photo.jpg nabil@192.168.0.199:/home/nabil/Desktop/



```
