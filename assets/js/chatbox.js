 // Cấu hình Gemini AI API
        const GEMINI_API_KEY = 'AIzaSyDfZhAPypqYdKGun2lTblYNheCHth5LXb8';
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        let conversationHistory = [];

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendQuickQuestion(question) {
            document.getElementById('messageInput').value = question;
            sendMessage();
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;

            // Hiển thị tin nhắn người dùng
            addMessage(message, 'user');
            input.value = '';
            
            // Hiển thị typing indicator
            showTypingIndicator();
            
            try {
                // Gọi API AI
                const response = await callAI(message);
                hideTypingIndicator();
                addMessage(response, 'bot');
            } catch (error) {
                hideTypingIndicator();
                addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
                console.error('API Error:', error);
            }
        }

        function addMessage(text, sender) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = text.replace(/\n/g, '<br>');
            
            messageDiv.appendChild(contentDiv);
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'block';
            document.getElementById('sendBtn').disabled = true;
        }

        function hideTypingIndicator() {
            document.getElementById('typingIndicator').style.display = 'none';
            document.getElementById('sendBtn').disabled = false;
        }

        async function callAI(message) {
            // Thêm context cho chuyên gia sức khỏe
            const systemPrompt = `Bạn là một chuyên gia tư vấn sức khỏe và dinh dưỡng. Hãy trả lời bằng tiếng Việt, cung cấp thông tin chính xác, thực tế và hữu ích. Luôn nhắc nhở người dùng tham khảo ý kiến bác sĩ cho các vấn đề nghiêm trọng. Câu trả lời nên ngắn gọn, dễ hiểu và có cấu trúc rõ ràng.`;
            
            conversationHistory.push({role: "user", content: message});

            // Nếu chưa có API key thì dùng demo response
            if (!GEMINI_API_KEY || GEMINI_API_KEY === 'AIzaSyDfZhAPypqYdKGun2lTblYNheCHth5LXb8-01Ms') {
                return getDemoResponse(message);
            }

            // Gọi Gemini AI API
            try {
                const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${systemPrompt}\n\nCâu hỏi: ${message}`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 1000,
                            topP: 0.8,
                            topK: 10
                        }
                    })
                });

                const data = await response.json();
                
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    conversationHistory.push({role: "assistant", content: aiResponse});
                    return aiResponse;
                } else {
                    throw new Error('Không thể lấy phản hồi từ Gemini API');
                }
            } catch (error) {
                console.error('Gemini API Error:', error);
                return getDemoResponse(message);
            }
        }

        function getDemoResponse(message) {
            // Demo responses cho các chủ đề phổ biến
            const responses = {
                'giảm cân': `🍽️ Chế độ ăn giảm cân hiệu quả:**
                • Ăn nhiều rau xanh: Brokoli, cải bó xôi, cải thảo
                • Protein nạc: Thịt gà, cá, đậu phụ, trứng
                • Carb phức tạp: Gạo lứt, yến mạch, khoai lang
                • Uống đủ nước: 2-3 lít/ngày
                • Hạn chế: Đường, thức ăn chiên, đồ uống có ga

            Lưu ý: Giảm 0.5-1kg/tuần là an toàn. Nên tham khảo chuyên gia dinh dưỡng!`,
                'miễn dịch': `💪 Cách tăng cường miễn dịch:**
                • Vitamin C: Cam, chanh, ổi, kiwi
                • Zinc: Hạt bí, thịt đỏ, đậu
                • Vitamin D: Ánh nắng mặt trời, cá béo
                • Ngủ đủ giấc: 7-8 tiếng/đêm
                • Tập thể dục: 30 phút/ngày
                • Quản lý stress: Thiền, yoga

            Lưu ý: Nếu hay ốm, nên khám sức khỏe tổng quát!`,
                'tiểu đường': `🍎 **Chế độ ăn cho người tiểu đường:**
                • Nên ăn Rau xanh, cá, thịt nạc, gạo lứt
                • Hạn chế Đường, bánh ngọt, nước ngọt
                • Ăn nhiều bữa nhỏ 5-6 bữa/ngày
                • Kiểm soát portion Dùng đĩa nhỏ
                • Tập thể dục: Đi bộ sau ăn

            Quan trọng: Phải theo dõi đường huyết và tuân thủ điều trị của bác sĩ!`,
                'tim mạch': `❤️ Thực phẩm tốt cho tim mạch:**
                • Cá béo: Cá hồi, cá thu, cá ngừ
                • Hạt: Óc chó, hạnh nhân, hạt lanh
                • Trái cây: Việt quất, dâu tây, lựu
                • Rau xanh: Cải bó xôi, cải kale
                • Yến mạch: Giúp giảm cholesterol
                Tránh: Thức ăn nhiều muối, chất béo trans
                Lưu ý: Nên kiểm tra sức khỏe tim mạch định kỳ!`
            };

            // Tìm response phù hợp
            const lowerMessage = message.toLowerCase();
            for (let key in responses) {
                if (lowerMessage.includes(key)) {
                    return responses[key];
                }
            }

            // Default response
            return `Cám ơn bạn đã hỏi về "${message}". 

            Tôi là chatbot tư vấn sức khỏe demo. Để có trả lời chính xác hơn, bạn có thể:
            🔸 Hỏi về: dinh dưỡng, giảm cân, tăng miễn dịch, bệnh tiểu đường, tim mạch
            🔸 Sử dụng các gợi ý phía trên
            🔸 Tích hợp API AI thực tế (OpenAI, Gemini) vào code
                Lưu ý quan trọng: Luôn tham khảo ý kiến bác sĩ cho các vấn đề sức khỏe nghiêm trọng!`;
        }

        // Khởi tạo
        document.getElementById('messageInput').focus();



