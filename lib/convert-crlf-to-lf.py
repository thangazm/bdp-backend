
import os


directory_in_str = os.path.dirname(os.path.realpath(__file__))
windows_line_ending = b'\r\n'
linux_line_ending = b'\n'

all_files = []
for root, dirs, files in os.walk(directory_in_str):
	for name in files:
		if name.endswith('.py'):
			full_path = os.path.join(root, name)
			if full_path.find('migrations') == -1:
				all_files.append(full_path)



for filename in all_files:
	print(filename)
	with open(filename, 'rb') as f:
		content = f.read()
		content = content.replace(windows_line_ending, linux_line_ending)

	with open(filename, 'wb') as f:
		f.write(content)