"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

interface TokenItem {
  id: number;
  name: string;
  priority: Priority;
}

export function TokenList() {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<Priority>("High");
  const [idCounter, setIdCounter] = useState(0);

  const addToken = () => {
    if (!name.trim()) return;
    const newToken: TokenItem = { id: idCounter, name: name.trim(), priority };
    setTokens((prev) => [...prev, newToken]);
    setIdCounter((prev) => prev + 1);
    setName("");
    setPriority("High");
  };

  const deleteToken = (id: number) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Token Priority List</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Token Name</label>
          <Input
            placeholder="Enter token name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Priority</label>
          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addToken}>Add Token</Button>
        {tokens.length > 0 && (
          <div className="mt-4 space-y-2">
            {tokens.map((t) => (
              <Card key={t.id} className="flex items-center justify-between p-2">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.priority}</p>
                </div>
                <Button variant="outline" size="icon" onClick={() => deleteToken(t.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
