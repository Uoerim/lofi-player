# THIS CODE IS USED TO RENAME ALL THE IMAGES PUT INTO "gifs" FOLDER AT ONCE
# IT WORKS BY DOING THE FOLLOWING.....
# Declares a variable i to keep track of the current file number.
# Sets the variable path to the directory containing the GIF files.
# Iterates over the files in the directory, using the os.listdir() function.
# For each file, tries to rename it to back- followed by the current file number and the .gif extension.
# If the rename operation fails, the code uses the len() function to get the number of files in the directory, and then uses the os.path.isfile() function to check if the file exists. If the file exists, the code renames it to back- followed by the number of files in the directory and the .gif extension.
# The if __name__ == '__main__': statement ensures that the main() function is only executed when the code is run as a script.


import os, os.path
def main():
	i = 1
	path="./assets/gifs/"
	for filename in os.listdir(path):
	     try:
		      	my_dest ="back-" + str(i) + ".gif"
		      	my_source =path + filename
		      	my_dest =path + my_dest
		      	os.rename(my_source, my_dest)
		      	i += 1
	     except:
		        os.rename(my_source, path + 'back-' + str(len([name for name in os.listdir('./assets/gifs') if os.path.isfile(os.path.join('./assets/gifs', name))])) + '.gif')
	            
if __name__ == '__main__':
	main()