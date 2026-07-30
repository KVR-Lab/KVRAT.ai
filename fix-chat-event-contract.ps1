$file = ".\src\chat\chat.service.ts"

$content = Get-Content $file -Raw


$old = @'
this.eventBus.emit({

            type:"chat.message",

            sessionId,

            message,

            createdAt:
            new Date()

        });
'@


$new = @'
this.eventBus.emit({

            name:"chat.message",

            payload:{
                sessionId,
                message
            },

            createdAt:
            new Date()

        });
'@


$content = $content.Replace($old,$new)


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] Chat Event Contract"