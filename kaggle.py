import kagglehub

kagglehub.login()

handle = 'shivamshukla2/Delhi_Rooftop'          # no angle brackets
local_dataset_dir = r'D:\Delhi_Rooftop_dataset'  # raw string — no escape issues

kagglehub.dataset_upload(handle, local_dataset_dir)
