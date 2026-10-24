# KVRAT.ai Supplier Interest Form — Local CSV Export

The supplier-interest form creates a UTF-8 CSV file in the visitor's browser and asks the browser to download it. The CSV contains the form's submitted contact fields and consent choices.

## Important limitations
- This is a local export only. It does not upload the data to KVRAT.ai, a server, GitHub, or a central database.
- Each submission downloads a separate CSV file. Combining leads requires the operator to collect and merge the files manually in Excel or another spreadsheet application.
- The registration page must not claim that KVRAT.ai received a submission merely because a file was downloaded.
- The file may contain personal contact information. Store it securely, restrict access, and share it only through an approved private channel.
- The browser download behavior varies by device. The visitor should verify that the CSV file was actually downloaded before leaving the page.

## Export format
The export uses UTF-8 with a byte-order mark for spreadsheet compatibility, CSV quoting/escaping, and a timestamp generated on the visitor's device. The timestamp is the device's local time, not a server-verified submission time.

## Future central collection
If KVRAT.ai later needs central collection, integrate a private backend/database with access controls, retention/deletion procedures, privacy notice, and anti-abuse protections. Do not commit supplier records or service secrets to this public repository.
