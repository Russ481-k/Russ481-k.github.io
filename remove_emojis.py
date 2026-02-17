
import os
import re

def remove_emojis(text):
    # Regex for matching emojis
    # This regex matches a wide range of emojis
    emoji_pattern = re.compile("["
        u"\U0001f600-\U0001f64f"  # emoticons
        u"\U0001f300-\U0001f5ff"  # symbols & pictographs
        u"\U0001f680-\U0001f6ff"  # transport & map symbols
        u"\U0001f1e0-\U0001f1ff"  # flags (iOS)
        u"\U00002700-\U000027bf"  # dingbats
        u"\U0001f900-\U0001f9ff"  # supplemental symbols like thinking face
        u"\U0001f000-\U0001f02f"  # Mahjong
        u"\U0001f0a0-\U0001f0ff"  # Playing Cards
        u"\U00002600-\U000026ff"  # Misc symbols
        u"\U00002b00-\U00002bff"  # Misc symbols and arrows
        u"\U0000fe00-\U0000fe0f"  # Variation Selectors
        u"\U000020d0-\U000020ff"  # Combining Diacritical Marks for Symbols
        u"\U000000a9\U000000ae\U0000203c\U00002049\U00002122\U00002139\U00002194-\U00002199\U000021a9-\U000021aa\U0000231a-\U0000231b\U00002328\U000023cf\U000023e9-\U000023f3\U000023f8-\U000023fa\U000024c2\U000025aa-\U000025ab\U000025b6\U000025c0\U000025fb-\U000025fe\U00002600-\U00002604\U0000260e\U00002611\U00002614-\U00002615\U00002618\U0000261d\U00002620\U00002622-\U00002623\U00002626\U0000262a\U0000262e-\U0000262f\U00002638-\U0000263a\U00002640\U00002642\U00002648-\U00002653\U00002660\U00002663\U00002665-\U00002666\U00002668\U0000267b\U0000267f\U00002692-\U00002694\U00002696-\U00002697\U00002699\U0000269b-\U0000269c\U000026a0-\U000026a1\U000026aa-\U000026ab\U000026b0-\U000026b1\U000026bd-\U000026be\U000026c4-\U000026c5\U000026c8\U000026ce-\U000026cf\U000026d1\U000026d3-\U000026d4\U000026e9-\U000026ea\U000026f0-\U000026f5\U000026f7-\U000026fa\U000026fd\U00002934-\U00002935\U00002b05-\U00002b07\U00002b1b-\U00002b1c\U00002b50\U00002b55\U00003030\U0000303d\U00003297\U00003299\U000024c2-\U0001f251"
        "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                print(f"Processing {file_path}...")
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = remove_emojis(content)
                    
                    if content != new_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Removed emojis from {file_path}")
                    else:
                        print(f"No emojis found in {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        target_dir = sys.argv[1]
        if os.path.isdir(target_dir):
            process_directory(target_dir)
        elif os.path.isfile(target_dir):
             # Handle single file for testing
            file_path = target_dir
            print(f"Processing {file_path}...")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = remove_emojis(content)
                
                if content != new_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Removed emojis from {file_path}")
                else:
                    print(f"No emojis found in {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
        else:
             print("Invalid directory or file path provided.")
    else:
        print("Please provide a directory or file path.")
