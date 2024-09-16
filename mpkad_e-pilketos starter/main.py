import pandas as pd
import os
from pathlib import Path
from typewriter import typewriter

current_directory = Path.cwd()
welcome_text = """
---------------------------------CONVERT CSV TO JSON TOOLS---------------------------------

Made By: Mocateaja
"""
description_text = """
This is a self made python code for convert csv file
 into json
"""
typewriter(welcome_text, 500)
typewriter(description_text, 800)
print(f"""
Let's Start
""")
csv_filename = input("csv filename: ")+".csv"
json_filename = input("json output filename: ")+".json"
print("")

csv_path = current_directory / csv_filename
json_path = current_directory / json_filename

try:
    # Membaca file CSV
    df = pd.read_csv(csv_path)
    print(f"Success reading CSV: {csv_path}")

    # Mengkonversi dan menyimpan sebagai JSON
    df.to_json(json_path, orient='records')
    print(f"Success save JSON: {json_path}")
    print("Convert complete!")

except FileNotFoundError:
    print(f"Error: CSV File not found in {csv_path}")
    print("Convert failed!")
except pd.errors.EmptyDataError:
    print(f"Error: CSV File not found in {csv_path}")
    print("Convert failed!")
except Exception as e:
    print(f"Error: {str(e)}")
    print("Convert failed!")